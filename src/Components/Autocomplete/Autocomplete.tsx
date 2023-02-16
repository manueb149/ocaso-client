import React, { useEffect, useState } from 'react';
import { Form, FormInstance, Select } from 'antd';
import useDebounce from '../../../utils/hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { selectContacto, suggestContacto } from '../../../slices/contacto.slice';

interface Props {
  type?: 'Contratante' | 'Vendedor';
  form?: FormInstance;
  disabled?: boolean;
}

/**
 * Autocomplete input.
 * @return {JSX.Element} Loading screen JSX
 */
const Autocomplete: React.FC<Props> = ({ type = 'Contratante', disabled = false }): JSX.Element => {
  const [value, setValue] = useState('');
  const [valueTrigger, setValueTrigger] = useState('');
  const { suggestions } = useSelector((state: RootState) => state.contacto);
  const debouncedValue = useDebounce<string>(valueTrigger, 300);

  const options = () => {
    if (type === 'Vendedor') {
      return suggestions
        .filter((contacto) => contacto.vendedor)
        .map((contacto) => ({
          value: contacto.cedula,
          label: `(${contacto.cedula}) ${contacto.nombres} ${contacto.apellidos || ''}`,
        }));
    }
    return suggestions.map((contacto) => ({
      value: contacto.cedula,
      label: `(${contacto.cedula}) ${contacto.nombres} ${contacto.apellidos || ''}`,
    }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const onSearch = (searchText: string) => {
    setValue(searchText);
    setValueTrigger(searchText);
  };

  const onSelect = (cedula: string) => {
    setValue(cedula);
    dispatch(selectContacto({ cedula, type }));
  };

  useEffect(() => {
    dispatch(selectContacto({ cedula: null, type }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value) dispatch(suggestContacto(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Form.Item
      id={`autocomplete${type}`}
      name={type.toLowerCase()}
      label={type}
      hasFeedback
      rules={[
        {
          required: type === 'Contratante',
          message: `Ingrese un ${type}`,
        },
      ]}
    >
      <Select
        value={value}
        allowClear={type === 'Vendedor'}
        showSearch
        placeholder="Buscar por cédula"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={options()}
        onSearch={onSearch}
        onSelect={onSelect}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default Autocomplete;
