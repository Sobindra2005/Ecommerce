"use client";

import { Control } from "react-hook-form";
import { Button } from "@repo/ui/ui/button";
import { Label } from "@repo/ui/ui/label";
import { FormInput } from "@repo/ui/form/FormInput";
import { MdLocationOn } from "react-icons/md";
import { FaCity, FaMapMarkedAlt, FaMapMarkerAlt } from "react-icons/fa";

interface AddressFieldsProps {
    control: Control<any>;
    prefix?: string;
    showMapPicker?: boolean;
    onMapPickerClick?: () => void;
}

export function AddressFields({ 
    control, 
    prefix = "", 
    showMapPicker = false,
    onMapPickerClick 
}: AddressFieldsProps) {
    const getFieldName = (field: string) => prefix ? `${prefix}.${field}` : field;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label>Address</Label>
                    {showMapPicker && onMapPickerClick && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onMapPickerClick}
                            className="text-xs"
                        >
                            <FaMapMarkerAlt className="mr-1" size={12} />
                            Pick from Map
                        </Button>
                    )}
                </div>
                <FormInput
                    control={control}
                    name={getFieldName("address")}
                    placeholder="123 Main St"
                    icon={<MdLocationOn size={18} />}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormInput
                    control={control}
                    name={getFieldName("city")}
                    label="City"
                    placeholder="New York"
                    icon={<FaCity size={16} />}
                />
                <FormInput
                    control={control}
                    name={getFieldName("zip")}
                    label="ZIP Code"
                    placeholder="10001"
                    icon={<FaMapMarkedAlt size={16} />}
                />
            </div>
        </div>
    );
}
