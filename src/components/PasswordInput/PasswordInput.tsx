import React, { useState, useCallback } from 'react';
import Input, { InputProps } from '../Input/Input';

const PasswordInput: React.FunctionComponent<InputProps> = (props) => {
  const [isSecured, setIsSecured] = useState<boolean>(true);
  const toggleVisibility = useCallback(() => {
    setIsSecured(secured => !secured);
  }, [isSecured, setIsSecured]);

  return (
    <Input
      textContentType="password"
      {...props}
      secureTextEntry={isSecured}
      icon={isSecured ? 'Eye' : 'EyeClosed'}
      autoCapitalize="none"
      autoCorrect={false}
      onIconPress={toggleVisibility}
    />
  )
};

export default PasswordInput;