"use client"

import * as React from "react"
import { Button } from "@repo/ui/ui/button"
import { Input } from "@repo/ui/ui/input"
import { Label } from "@repo/ui/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/ui/select"
import { Search } from "lucide-react"

interface CreateOrderFormProps {
    onCancel?: () => void
    onSubmit?: (data: any) => void
}

export function CreateOrderForm({ onCancel, onSubmit }: CreateOrderFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simplified logic
        const formData = {
            customer: (e.target as any).customer.value,
            product: (e.target as any).product.value,
            quantity: (e.target as any).quantity.value,
            paymentMethod: (e.target as any).paymentMethod.value,
        }
        console.log("Order Data:", formData)
        onSubmit?.(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="customer">Customer</Label>
                <div className="relative">
                    <Input id="customer" name="customer" placeholder="Search customer by name or email" className="pl-9" required />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="product">Product</Label>
                <div className="relative">
                    <Input id="product" name="product" placeholder="Search product to add..." className="pl-9" required />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" name="quantity" type="number" min="1" defaultValue="1" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select name="paymentMethod" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="credit_card">Credit Card</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="cod">Cash on Delivery</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Input id="address" name="address" placeholder="Full shipping address" required />
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Create Order</Button>
            </div>
        </form>
    )
}
