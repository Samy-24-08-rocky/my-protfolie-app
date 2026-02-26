import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const { action } = await request.json();

        if (action === 'clear-cache') {
            revalidatePath('/');
            revalidatePath('/admin');
            return NextResponse.json({ message: 'Cache cleared successfully' });
        }

        if (action === 'find-duplicates') {
            const db = await readDb();
            const duplicates = {
                projects: [] as any[],
                gallery: [] as any[]
            };

            // Check projects for duplicate titles or images
            const projectTitles = new Set();
            const projectImages = new Set();
            db.projects.forEach((p: any) => {
                if (projectTitles.has(p.title) || projectImages.has(p.image)) {
                    duplicates.projects.push(p);
                }
                projectTitles.add(p.title);
                projectImages.add(p.image);
            });

            // Check gallery for duplicate titles or sources
            const galleryTitles = new Set();
            const gallerySrcs = new Set();
            db.gallery.forEach((g: any) => {
                if (galleryTitles.has(g.title) || gallerySrcs.has(g.src)) {
                    duplicates.gallery.push(g);
                }
                galleryTitles.add(g.title);
                gallerySrcs.add(g.src);
            });

            return NextResponse.json({ duplicates });
        }

        if (action === 'delete-duplicates') {
            const db = await readDb();

            // Remove duplicates from projects (keep first occurrence)
            const seenProjectTitles = new Set();
            const seenProjectImages = new Set();
            const originalProjectCount = db.projects.length;
            db.projects = db.projects.filter((p: any) => {
                if (seenProjectTitles.has(p.title) || seenProjectImages.has(p.image)) {
                    return false;
                }
                seenProjectTitles.add(p.title);
                seenProjectImages.add(p.image);
                return true;
            });

            // Remove duplicates from gallery
            const seenGalleryTitles = new Set();
            const seenGallerySrcs = new Set();
            const originalGalleryCount = db.gallery.length;
            db.gallery = db.gallery.filter((g: any) => {
                if (seenGalleryTitles.has(g.title) || seenGallerySrcs.has(g.src)) {
                    return false;
                }
                seenGalleryTitles.add(g.title);
                seenGallerySrcs.add(g.src);
                return true;
            });

            await writeDb(db);

            return NextResponse.json({
                message: 'Duplicates deleted',
                removedProjects: originalProjectCount - db.projects.length,
                removedGallery: originalGalleryCount - db.gallery.length
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        console.error('Maintenance error:', error);
        return NextResponse.json({ error: 'Maintenance task failed' }, { status: 500 });
    }
}
