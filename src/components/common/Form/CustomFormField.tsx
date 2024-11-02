import React, { Component } from 'react';
import { Brand, Category } from './../../../data/datas';
import { SelectProps } from './../../modals/SaveCarModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ErrorMessageProps {
  message: string;
  highlightedText?: string;
}

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | number | undefined;
  onBlur?: (name: string) => void;
  onChange?: (value: string, name: string) => void;
  touched?: boolean;
  error?: boolean;
  placeholder?: string;
  options?: Array<Category | SelectProps | Brand>;
  hasAddon?: boolean;
  addonContent?: string;
  inputClassName?: string;
  labelClassName?: string;
  isRequired?: boolean;
  errorMessage?: string;
}

class ErrorMessage extends Component<ErrorMessageProps> {
  static defaultProps = {
    highlightedText: 'Oops!',
  };

  render() {
    const { message, highlightedText } = this.props;
    return (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        <span className="font-medium">{highlightedText}</span>&nbsp;{message}
      </p>
    );
  }
}

class CustomFormField extends Component<InputProps> {
  static defaultProps = {
    hasAddon: false,
    isRequired: false,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, name } = this.props;
    if (onChange) {
      onChange(e.target.value, name);
    }
  };

  handleSelectChange = (selectedValue: string) => {
    const { onChange, name } = this.props;
    if (onChange) {
      onChange(selectedValue, name);
    }
  };

  handleBlur = () => {
    const { onBlur, name } = this.props;
    if (onBlur) {
      onBlur(name);
    }
  };

  render() {
    const {
      label,
      type,
      name,
      value,
      touched,
      error,
      placeholder,
      hasAddon,
      addonContent,
      inputClassName,
      labelClassName,
      isRequired,
      errorMessage,
      options,
    } = this.props;

    if (type === 'select') {
      const selectId = `select-${name}`;

      return (
        <div className="form-field">
          <label htmlFor={selectId} className={labelClassName}>
            {label}
            {isRequired && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </label>
          <Select 
            name={name}
            value={value?.toString()}
            onValueChange={this.handleSelectChange}
            onOpenChange={(open: unknown) => {
              if (!open) {
                this.handleBlur();
              }
            }}
          >
            <SelectTrigger 
              id={selectId}
              className={`${inputClassName} h-42`}
              aria-required={isRequired}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent 
              position="popper"
              className="max-h-[10rem] overflow-y-auto"
            >
              {options?.map((option) => (
                <SelectItem 
                  key={option.id} 
                  value={option.name}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched && error && errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
      );
    }

    return (
      <div>
        <label htmlFor={name} className={labelClassName}>
          {label}
          {isRequired && <span style={{ color: 'red' }}>&nbsp;*</span>}
        </label>
        <div className={`relative mb-6 ${hasAddon ? 'with-addon' : ''}`}>
          {hasAddon && (
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400">{addonContent || ''}</span>
            </div>
          )}
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
            className={inputClassName}
            placeholder={placeholder}
            required={isRequired}
          />
        </div>
        {touched && error && errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default CustomFormField;