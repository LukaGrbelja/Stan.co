import multer from "multer";
import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const imgStorage = new CloudinaryStorage({
    cloudinary: v2,
    params: {
        folder: "pictures",
        allowed_formats: [
            "apng",
            "bmp",
            "gif",
            "jpeg",
            "jpg",
            "pjpeg",
            "png",
            "svg+xml",
            "tiff",
            "webp",
            "x-icon",
        ]
    }
});

const uploadImg = multer({ storage: imgStorage });

export { v2, uploadImg };