import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Project, GalleryItem } from '@/lib/models';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const { action } = await request.json();
        await dbConnect();

        if (action === 'clear-cache') {
            revalidatePath('/');
            revalidatePath('/admin');
            return NextResponse.json({ message: 'Cache cleared successfully' });
        }

        if (action === 'find-duplicates') {
            const projects = await Project.find({});
            const gallery = await GalleryItem.find({});

            const duplicates = {
                projects: [] as any[],
                gallery: [] as any[]
            };

            const projectTitles = new Set();
            const projectImages = new Set();
            projects.forEach((p: any) => {
                if (projectTitles.has(p.title) || (p.image && projectImages.has(p.image))) {
                    duplicates.projects.push(p);
                }
                projectTitles.add(p.title);
                if (p.image) projectImages.add(p.image);
            });

            const galleryTitles = new Set();
            const gallerySrcs = new Set();
            gallery.forEach((g: any) => {
                if (galleryTitles.has(g.title) || (g.src && gallerySrcs.has(g.src))) {
                    duplicates.gallery.push(g);
                }
                galleryTitles.add(g.title);
                if (g.src) gallerySrcs.add(g.src);
            });

            return NextResponse.json({ duplicates });
        }

        if (action === 'delete-duplicates') {
            const projects = await Project.find({}).sort({ createdAt: 1 });
            const gallery = await GalleryItem.find({}).sort({ createdAt: 1 });

            let removedProjects = 0;
            const seenProjectTitles = new Set();
            const seenProjectImages = new Set();

            for (const p of projects) {
                if (seenProjectTitles.has(p.title) || (p.image && seenProjectImages.has(p.image))) {
                    await Project.findByIdAndDelete(p._id);
                    removedProjects++;
                } else {
                    seenProjectTitles.add(p.title);
                    if (p.image) seenProjectImages.add(p.image);
                }
            }

            let removedGallery = 0;
            const seenGalleryTitles = new Set();
            const seenGallerySrcs = new Set();

            for (const g of gallery) {
                if (seenGalleryTitles.has(g.title) || (g.src && seenGallerySrcs.has(g.src))) {
                    await GalleryItem.findByIdAndDelete(g._id);
                    removedGallery++;
                } else {
                    seenGalleryTitles.add(g.title);
                    if (g.src) seenGallerySrcs.add(g.src);
                }
            }

            return NextResponse.json({
                message: 'Duplicates deleted',
                removedProjects,
                removedGallery
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error('Maintenance error:', error);
        return NextResponse.json({ error: 'Maintenance task failed' }, { status: 500 });
    }
}
