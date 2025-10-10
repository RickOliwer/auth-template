// src/components/ui/password-input.tsx
"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggle?: boolean;
  onToggleVisibility?: (visible: boolean) => void;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, showToggle = true, onToggleVisibility, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newVisibility = !showPassword;

    setShowPassword(newVisibility);
    onToggleVisibility?.(newVisibility);
  };

  if (!showToggle) {
    return (
      <InputGroup>
        <InputGroupInput
          type="password"
          className={className}
          ref={ref}
          {...props}
        />
      </InputGroup>
    );
  }

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type={showPassword ? "text" : "password"}
        className={className}
        ref={ref}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          title={showPassword ? "Hide password" : "Show password"}
          size="icon-xs"
          onClick={togglePassword}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
});

PasswordInput.displayName = "PasswordInput";
