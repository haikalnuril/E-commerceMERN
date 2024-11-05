import multer from "multer";
import path from "path";

const fileType = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValidFormat = fileType[file.mimetype];
        let uploadError = new Error("Invalid image type");

        if (isValidFormat) {
            uploadError = null;
        }

        cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueFile = `${Date.now()}-${file.originalname}`;
        cb(null,uniqueFile);
    },
});

export const upload = multer({ storage: storage });
