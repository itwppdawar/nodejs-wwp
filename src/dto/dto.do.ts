interface IDo {
	readonly itemNumber?: string
	readonly productName?: string
	readonly delivered?: string
	readonly unit?: string
	readonly delivered2?: string
	readonly unit2?: string
	readonly unitPrice?: string
	readonly discountpPrcent?: string
	readonly totalDiscountPercent?: string
	readonly amount?: Date
	readonly taxAmount?: string
	readonly pricesIncludeSalesTax?: string
	readonly amountExcTax?: string
	readonly amountIncTax?: string
	readonly value?: string
    readonly div?: string
}

export class DoDTO implements IDo {
	readonly itemNumber?: string
	readonly productName?: string
	readonly delivered?: string
	readonly unit?: string
	readonly delivered2?: string
	readonly unit2?: string
	readonly unitPrice?: string
	readonly discountpPrcent?: string
	readonly totalDiscountPercent?: string
	readonly amount?: Date
	readonly taxAmount?: string
	readonly pricesIncludeSalesTax?: string
	readonly discountPercent?: string
	readonly amountExcTax?: string
	readonly amountIncTax?: string
	readonly value?: string
	readonly div?: string
}