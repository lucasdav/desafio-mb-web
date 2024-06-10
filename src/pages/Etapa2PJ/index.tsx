import { useState } from "react";
import DynamicButton from "../../components/DynamicButton";
import DynamicInput from "../../components/DynamicInput";
import Stepper from "../../components/Stepper";
import { ButtonProps } from "../../enum/ButtonProps";
import { FormInputProps } from "../../interfaces/FormInputProps";
import { InputIds } from "../../enum/InputIds";
import { useFormData } from "../../hooks/useFormData";
import { useNavigate } from "react-router-dom";

export default function Etapa2PJ() {
  const { formData, setFormData } = useFormData();
  const [localInputValues, setLocalInputValues] = useState<{
    [key: string]: string;
  }>({});
  const [hasAlertMessage, setHasAlertMessage] = useState<{
    [key: string]: string;
  }>({});

  const navigate = useNavigate();

  const verifyAccountType = () => { 
    if (!formData.accountType) {
      navigate('/registration');
    } 
    return;
  }

  verifyAccountType();
  
  const titleLabel = "Pessoa Jurídica";

  const formInputProps: FormInputProps[] = [
    {
      idInput: InputIds.razaoSocial,
      labelInput: "Razão social",
      inputType: "text",
      maxLenghtProp: 50,
    },
    {
      idInput: InputIds.cnpj,
      labelInput: "CNPJ",
      inputType: "text",
      maxLenghtProp: 18,
    },
    {
      idInput: InputIds.dataAbertura,
      labelInput: "Data de abertura",
      inputType: "text",
      maxLenghtProp: 10,
    },
    {
      idInput: InputIds.telefone,
      labelInput: "Telefone",
      inputType: "text",
      maxLenghtProp: 15,
    },
  ];

  const setDynamicAlertMessage = (id: string, message: string) => {
    setHasAlertMessage((prevMessages) => ({
      ...prevMessages,
      [id]: message,
    }));
  };

  const handleInputChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setLocalInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const disableButton = !Object.values(hasAlertMessage).some(
    (message) => message !== ""
  );

  return (
    <div>
      <Stepper activeStep="2" maxStep="4" labelStep={titleLabel} />
      {formInputProps.map((form, index) => (
        <DynamicInput
          key={`form-pf-input-${form.idInput}-${index}`}
          idInput={form.idInput}
          labelInput={form.labelInput}
          inputType={form.inputType}
          setDynamicAlertMessage={setDynamicAlertMessage}
          maxLenghtProp={form.maxLenghtProp}
          inputValue={localInputValues[form.idInput] || ""}
          onChangeInputValue={(e) => handleInputChange(form.idInput, e)}
        />
      ))}
      <DynamicButton label="Voltar" buttonWidth={ButtonProps.voltarButton} />
      <DynamicButton
        label="Continuar"
        buttonWidth={ButtonProps.continuarButton}
        to="etapa3/pj"
        disableButton={disableButton}
      />
    </div>
  );
}
