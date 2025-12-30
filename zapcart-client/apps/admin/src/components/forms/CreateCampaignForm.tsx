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

interface CreateCampaignFormProps {
    onCancel?: () => void
    onSubmit?: (data: any) => void
}

export function CreateCampaignForm({ onCancel, onSubmit }: CreateCampaignFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = {
            name: (e.target as any).name.value,
            startDate: (e.target as any).startDate.value,
            endDate: (e.target as any).endDate.value,
            discountType: (e.target as any).discountType.value,
            discountValue: (e.target as any).discountValue.value,
        }
        console.log("Campaign Data:", formData)
        onSubmit?.(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" name="name" placeholder="e.g. Summer Sale 2025" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" name="startDate" type="date" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" name="endDate" type="date" required />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="discountType">Discount Type</Label>
                    <Select name="discountType" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                            <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="discountValue">Value</Label>
                    <Input id="discountValue" name="discountValue" type="number" min="0" placeholder="0" required />
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Create Campaign</Button>
            </div>
        </form>
    )
}
