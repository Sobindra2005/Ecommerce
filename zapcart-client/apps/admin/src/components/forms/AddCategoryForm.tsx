"use client"

import * as React from "react"
import { Button } from "@repo/ui/ui/button"
import { Input } from "@repo/ui/ui/input"
import { Label } from "@repo/ui/ui/label"
import { Textarea } from "@repo/ui/ui/textarea"
import { Upload } from "lucide-react"

interface AddCategoryFormProps {
    onCancel?: () => void
    onSubmit?: (data: any) => void
}

export function AddCategoryForm({ onCancel, onSubmit }: AddCategoryFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = {
            name: (e.target as any).name.value,
            slug: (e.target as any).slug.value,
            description: (e.target as any).description.value,
        }
        console.log("Category Data:", formData)
        onSubmit?.(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" name="name" placeholder="e.g. Electronics" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" placeholder="e.g. electronics" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" name="description" placeholder="Category description..." />
            </div>

            <div className="grid gap-2">
                <Label>Category Icon/Image</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Icon</span>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Add Category</Button>
            </div>
        </form>
    )
}
