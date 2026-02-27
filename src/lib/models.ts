import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [String],
    github: { type: String },
    link: { type: String },
}, { timestamps: true });

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    src: { type: String, required: true },
    category: { type: String },
}, { timestamps: true });

const SettingsSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const GalleryItem = mongoose.models.GalleryItem || mongoose.model('GalleryItem', GallerySchema);
export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
