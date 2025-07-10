import { Request, Express } from "express";
import multer, { StorageEngine, Multer } from "multer";
import { resolve } from "path";
import { existsSync, unlink } from "fs";

const excelStorage: StorageEngine = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, done): void => {
		if (!file) return done(new Error("Upload file error"), null);

		const uploadDir = resolve(process.cwd(), "src/uploads/excel");
		const fileExists = existsSync(resolve(uploadDir, file.originalname));
		if (!fileExists) return done(null, uploadDir);

		unlink(resolve(uploadDir, file.originalname), (error: any): void => {
			if (error) return done(null, error);
			return done(null, uploadDir);
		});
	},
	filename: (req: any, file: Express.Multer.File, done): void => {
		if (file) {
			const extFile = file.originalname.toLowerCase();
			const extPattern = /\.(xlsx|xls|csv)$/i.test(extFile);
			if (!extPattern) {
				return done(
					new TypeError("File format must be Excel (.xlsx, .xls) or CSV"),
					null
				);
			}
			const timestamp = Date.now();
			const filename = `${timestamp}_${file.originalname}`;
			req.uploadedFile = filename;
			return done(null, filename);
		}
	},
});

export const excelUpload: Multer = multer({
	storage: excelStorage,
	limits: { fileSize: 5000000 }, // 5MB limit for Excel files
});
