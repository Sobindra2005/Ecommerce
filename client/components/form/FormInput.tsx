"use client";

import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    placeholder?: string;
    type?: string;
    icon?: React.ReactNode;
    className?: string;
    inputClassName?: string;
}

export function FormInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    icon,
    className,
    inputClassName,
}: FormInputProps<TFieldValues, TName>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className={className}>
                    {label && <FormLabel>{label}</FormLabel>}
                    <div className="relative">
                        {icon && (
                            <div className="absolute left-3 top-3 text-muted-foreground/60">
                                {icon}
                            </div>
                        )}
                        <FormControl>
                            <Input
                                {...field}
                                type={type}
                                placeholder={placeholder}
                                className={cn(
                                    icon && "pl-10",
                                    fieldState.error && "border-red-500 focus-visible:ring-red-500/50",
                                    !fieldState.error && field.value && "border-green-500 focus-visible:ring-green-500/50",
                                    inputClassName
                                )}
                            />
                        </FormControl>
                        {/* Success icon */}
                        {!fieldState.error && field.value && (
                            <div className="absolute right-3 top-3 text-green-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                        )}
                        {/* Error icon */}
                        {fieldState.error && (
                            <div className="absolute right-3 top-3 text-red-500 animate-in fade-in zoom-in">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
