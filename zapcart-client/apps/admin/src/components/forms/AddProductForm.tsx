"use client"

import * as React from "react"
import { Button } from "@repo/ui/ui/button"
import { Input } from "@repo/ui/ui/input"
import { Label } from "@repo/ui/ui/label"
import { Textarea } from "@repo/ui/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/ui/select"
import { Upload, X } from "lucide-react"

interface AddProductFormProps {
    onCancel?: () => void
    onSubmit?: (data: any) => void
}

export function AddProductForm({ onCancel, onSubmit }: AddProductFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Gather form data - simplified for this implementation
        const formData = {
            name: (e.target as any).name.value,
            category: (e.target as any).category.value,
            price: (e.target as any).price.value,
            stock: (e.target as any).stock.value,
            description: (e.target as any).description.value,
        }
        console.log("Product Data:", formData)
        onSubmit?.(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" placeholder="e.g. Wireless Headphones" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="home">Home & Garden</SelectItem>
                            <SelectItem value="toys">Toys</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input id="price" name="price" type="number" min="0" step="0.01" placeholder="0.00" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" name="stock" type="number" min="0" placeholder="0" required />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Product description..." className="h-24" />
            </div>

            <div className="grid gap-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Upload className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">Click to upload</p>
                        <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Add Product</Button>
            </div>
        </form>
    )
}
