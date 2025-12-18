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
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormPasswordInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
    control: Control<TFieldValues>;
    name: TName;
    label?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    className?: string;
    inputClassName?: string;
}

export function FormPasswordInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    control,
    name,
    label,
    placeholder = "••••••••",
    icon,
    className,
    inputClassName,
}: FormPasswordInputProps<TFieldValues, TName>) {
    const [showPassword, setShowPassword] = React.useState(false);

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
                                type={showPassword ? "text" : "password"}
                                placeholder={placeholder}
                                className={cn(
                                    icon ? "pl-10 pr-10" : "pr-10",
                                    fieldState.error && "border-red-500 focus-visible:ring-red-500/50",
                                    !fieldState.error && field.value && "border-green-500 focus-visible:ring-green-500/50",
                                    inputClassName
                                )}
                            />
                        </FormControl>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
