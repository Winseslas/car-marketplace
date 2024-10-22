import React, { Component } from 'react';
import { Brand, Category } from '../shared/datas';
import { SelectProps } from './SaveCarModal';

interface ErrorMessageProps {
  message: string;
  highlightedText?: string;
}

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | number | undefined;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
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

/**
 * Renders an error message with optional highlighted text.
 * The message is styled to be displayed in red, with a bold font for the highlighted text.
 * 
 * @returns A JSX element containing the formatted error message.
 */
  render() {
    const { message, highlightedText } = this.props;
    return (
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
        <span className="font-medium">{highlightedText}</span>&nbsp;{message}
      </p>
    );
  }
}

class FormField extends Component<InputProps> {
  static defaultProps = {
    hasAddon: false,
    isRequired: false,
  };

/**
 * Renders a form field based on the provided props. If the field type is 'select',
 * it renders a dropdown select element with options. Otherwise, it renders a standard
 * input field. Both field types include a label and optional error message display.
 * 
 * Props:
 * - label: The text label for the form field.
 * - type: The type of the input (e.g., 'text', 'select').
 * - name: The name attribute for the input element.
 * - value: The current value of the input.
 * - onBlur: Function to call when the input loses focus.
 * - onChange: Function to call when the input value changes.
 * - touched: Boolean indicating if the input has been interacted with.
 * - error: Boolean indicating if there's an error with the input value.
 * - placeholder: Placeholder text for the input.
 * - hasAddon: Boolean indicating if the input includes addon content.
 * - addonContent: Content to display as an addon inside the input field.
 * - inputClassName: CSS class for styling the input element.
 * - labelClassName: CSS class for styling the label element.
 * - isRequired: Boolean indicating if the input is required.
 * - errorMessage: Message to display when there's an error.
 * - options: Array of options for the select field type.
 * 
 * Returns a JSX element representing the form field, including any necessary
 * error messages, required indicators, and placeholder text.
 */
  render() {
    const {
      label,
      type,
      name,
      value,
      onBlur,
      onChange,
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
      return (
        <>
          <label htmlFor={name} className={labelClassName}>
            {label}
            {isRequired && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </label>
          <select
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            className={inputClassName}
            required={isRequired}
          >
            <option value="">{placeholder}</option>
            {options?.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          {touched && error && errorMessage && <ErrorMessage message={errorMessage} />}
        </>
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
            value={value}
            onChange={onChange}
            onBlur={onBlur}
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

export default FormField;
