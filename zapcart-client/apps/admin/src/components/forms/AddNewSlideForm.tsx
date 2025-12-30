"use client"

import * as React from "react"
import { Button } from "@repo/ui/ui/button"
import { Input } from "@repo/ui/ui/input"
import { Label } from "@repo/ui/ui/label"
import { Switch } from "@repo/ui/ui/switch"
import { Upload } from "lucide-react"

interface AddNewSlideFormProps {
    onCancel?: () => void
    onSubmit?: (data: any) => void
}

export function AddNewSlideForm({ onCancel, onSubmit }: AddNewSlideFormProps) {
    const [isActive, setIsActive] = React.useState(true)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = {
            title: (e.target as any).title.value,
            subtitle: (e.target as any).subtitle.value,
            linkUrl: (e.target as any).linkUrl.value,
            isActive,
        }
        console.log("Slide Data:", formData)
        onSubmit?.(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Slide Title</Label>
                <Input id="title" name="title" placeholder="e.g. New Collection Arrival" required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="subtitle">Subtitle/Description</Label>
                <Input id="subtitle" name="subtitle" placeholder="e.g. Shop the latest trends now" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input id="linkUrl" name="linkUrl" placeholder="/products/new-collection" />
            </div>

            <div className="grid gap-2">
                <Label>Slide Image</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center gap-2 hover:bg-gray-50/50 transition-colors cursor-pointer h-32">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload Banner Image (1920x600)</span>
                </div>
            </div>

            <Switch
                id="active-status"
                label="Active Status"
                checked={isActive}
                onCheckedChange={setIsActive}
                className="py-2 bg-transparent px-0"
            />

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Add Slide</Button>
            </div>
        </form>
    )
}
