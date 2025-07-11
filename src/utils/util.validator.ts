import { Request } from "express";
import {
	check,
	validationResult,
	ValidationError,
	ValidationChain,
	Result,
} from "express-validator";

export const expressValidator = (req: Request): ValidationError[] => {
	const errors: Result<ValidationError> = validationResult(req);

	const messages: ValidationError[] = [];
	if (!errors.isEmpty()) {
		for (const i of errors.array()) {
			messages.push(i);
		}
	}
	return messages;
};

export const paramsValiator = (): ValidationChain[] => [
	check("id").notEmpty().withMessage("id is required"),
	check("id").isNumeric().withMessage("id must be number"),
];

export const registerValidator = (): ValidationChain[] => [
	check("email").notEmpty().withMessage("email is required"),
	check("email").isEmail().withMessage("email is not valid"),
	check("password").notEmpty().withMessage("password is required"),
	check("password")
		.isLength({ min: 8 })
		.withMessage("password must be at least 8 characters"),
];

export const loginValidator = (): ValidationChain[] => [
	check("email").notEmpty().withMessage("email is required"),
	check("email").isEmail().withMessage("email is not valid"),
	check("password").notEmpty().withMessage("pasword is required"),
];

export const emailValidator = (): ValidationChain[] => [
	check("email").notEmpty().withMessage("email is required"),
	check("email").isEmail().withMessage("email is not valid"),
];

export const tokenValidator = (): ValidationChain[] => [
	check("token").notEmpty().withMessage("token is required"),
	check("token").isJWT().withMessage("token is not valid"),
];

export const topupValidator = (): ValidationChain[] => [
	check("user_id").notEmpty().withMessage("user_id is required"),
	check("user_id").isNumeric().withMessage("user_id must be a number"),
	check("topup_amount").notEmpty().withMessage("topup_amount is required"),
	check("topup_amount")
		.isNumeric()
		.withMessage("topup_amount must be a number"),
	check("topup_method").notEmpty().withMessage("topup_method is required"),
];

export const transferValidator = (): ValidationChain[] => [
	check("transfer_from").notEmpty().withMessage("transfer_from is required"),
	check("transfer_from")
		.isNumeric()
		.withMessage("transfer_from must be a number"),
	check("transfer_to").notEmpty().withMessage("transfer_to is required"),
	check("transfer_to").isNumeric().withMessage("transfer_to must be a number"),
	check("transfer_amount")
		.notEmpty()
		.withMessage("transfer_amount is required"),
	check("transfer_amount")
		.isNumeric()
		.withMessage("transfer_amount must be a number"),
];

export const reportValidator = (): ValidationChain[] => [
	// Required fields based on migration
	check("company").notEmpty().withMessage("company is required"),
	check("external_invoice")
		.notEmpty()
		.withMessage("external_invoice is required"),
	check("item_number").notEmpty().withMessage("item_number is required"),
	check("size_width").notEmpty().withMessage("size_width is required"),
	check("qty").notEmpty().withMessage("qty is required"),
	check("qty").isNumeric().withMessage("qty must be a number"),
	check("unit").notEmpty().withMessage("unit is required"),
	check("divisi").notEmpty().withMessage("divisi is required"),
	check("price").notEmpty().withMessage("price is required"),
	check("price").custom((value) => {
		// Handle formats like "12.750.00" (dots as thousand separators)
		const cleanValue = value.replace(/\./g, "").replace(/,/g, ".");
		if (isNaN(parseFloat(cleanValue))) {
			throw new Error("price must be a valid number");
		}
		return true;
	}),
	check("invoicing_name_custom")
		.notEmpty()
		.withMessage("invoicing_name_custom is required"),
	check("term").notEmpty().withMessage("term is required"),
	check("pay_status").notEmpty().withMessage("pay_status is required"),
];

export const fileUploadReport = (): ValidationChain[] => [
	check("company").notEmpty().withMessage("company is required"),
	check("external_invoice")
		.notEmpty()
		.withMessage("external_invoice is required"),
	check("item_number").notEmpty().withMessage("item_number is required"),
	check("size_width").notEmpty().withMessage("size_width is required"),
	check("qty").notEmpty().withMessage("qty is required"),
	check("qty").isNumeric().withMessage("qty must be a number"),
	check("unit").notEmpty().withMessage("unit is required"),
	check("divisi").notEmpty().withMessage("divisi is required"),
	check("price").notEmpty().withMessage("price is required"),
	check("price").custom((value) => {
		// Handle formats like "12.750.00" (dots as thousand separators)
		const cleanValue = value.replace(/\./g, "").replace(/,/g, ".");
		if (isNaN(parseFloat(cleanValue))) {
			throw new Error("price must be a valid number");
		}
		return true;
	}),
	check("invoicing_name_custom")
		.notEmpty()
		.withMessage("invoicing_name_custom is required"),
	check("term").notEmpty().withMessage("term is required"),
	check("pay_status").notEmpty().withMessage("pay_status is required"),
];
// request body validation create for request
export const requestValidator = (): ValidationChain[] => [
	check("request_number").notEmpty().withMessage("request_number is required"),
	check("request_name").notEmpty().withMessage("request_name is required"),
	check("request_date").notEmpty().withMessage("request_date is required"),
	check("request_date")
		.isISO8601()
		.withMessage("request_date must be a valid date"),
	check("request_by").notEmpty().withMessage("request_by is required"),
	check("request_to").notEmpty().withMessage("request_to is required"),
	check("request_status").notEmpty().withMessage("request_status is required"),
	check("request_type").notEmpty().withMessage("request_type is required"),
	check("request_priority")
		.notEmpty()
		.withMessage("request_priority is required"),
	check("request_description")
		.notEmpty()
		.withMessage("request_description is required"),
];

// request body validation create for invoice
export const invoiceValidator = (): ValidationChain[] => [
	check("invoice_number").notEmpty().withMessage("invoice_number is required"),
	check("invoice_date").notEmpty().withMessage("invoice_date is required"),
	check("invoice_date")
		.isISO8601()
		.withMessage("invoice_date must be a valid date"),
	check("customer_name").notEmpty().withMessage("customer_name is required"),
	check("customer_address")
		.notEmpty()
		.withMessage("customer_address is required"),
	check("total_amount").notEmpty().withMessage("total_amount is required"),
	check("total_amount")
		.isNumeric()
		.withMessage("total_amount must be a number"),
	check("tax_amount").isNumeric().withMessage("tax_amount must be a number"),
	check("status").notEmpty().withMessage("status is required"),
];

// request body validation create for sales order
export const salesOrderValidator = (): ValidationChain[] => [
	check("flag").notEmpty().withMessage("flag is required"),
	check("item_number").notEmpty().withMessage("item_number is required"),
	check("quantity").notEmpty().withMessage("quantity is required"),
	check("unit_price").notEmpty().withMessage("unit_price is required"),
	check("remain_unit_2").notEmpty().withMessage("remain_unit_2 is required"),
	check("sales_tax_group")
		.notEmpty()
		.withMessage("sales_tax_group is required"),
	check("item_sales_tax_group")
		.notEmpty()
		.withMessage("item_sales_tax_group is required"),
	check("value_inc_tax").notEmpty().withMessage("value_inc_tax is required"),
];

// request body validation create for sales quotation
export const salesQuotationValidator = (): ValidationChain[] => [
	check("item_number").notEmpty().withMessage("item_number is required"),
	check("product_name").notEmpty().withMessage("product_name is required"),
	check("search_name").notEmpty().withMessage("search_name is required"),
	check("site").notEmpty().withMessage("site is required"),
	check("warehouse").notEmpty().withMessage("warehouse is required"),
	check("sales_taker").notEmpty().withMessage("sales_taker is required"),
	check("sales_responsible")
		.notEmpty()
		.withMessage("sales_responsible is required"),
	check("quantity").notEmpty().withMessage("quantity is required"),
	check("unit_price").notEmpty().withMessage("unit_price is required"),
	check("discount_percent")
		.notEmpty()
		.withMessage("discount_percent is required"),
	check("discount").notEmpty().withMessage("discount is required"),
	check("net_amount").notEmpty().withMessage("net_amount is required"),
	check("dimension_value")
		.notEmpty()
		.withMessage("dimension_value is required"),
	check("note_1").notEmpty().withMessage("note_1 is required"),
	check("note_2").notEmpty().withMessage("note_2 is required"),
	check("note_3").notEmpty().withMessage("note_3 is required"),
];

export const adminValidator = (): ValidationChain[] => [
	check("email").notEmpty().withMessage("email is required"),
	check("email").isEmail().withMessage("email is not valid"),
	check("password").notEmpty().withMessage("password is required"),
	check("password")
		.isLength({ min: 8 })
		.withMessage("password must be at least 8 characters"),
	check("active").notEmpty().withMessage("active is required"),
	check("active").isBoolean().withMessage("active must be a boolean"),
	check("role").notEmpty().withMessage("role is required"),
	check("role").isString().withMessage("role must be a string"),
];
