import { useState } from "react";
import StepIndicator from "../components/Ui/StepIndicator";
import { renderStep, steps } from "../services/registerFormUtils";
import Button from "../components/Ui/Button";
import registrationApiRequest from "../services/apiRequests/registrationApiRequest";
import stepValidationSchemas from "../../utils/validations/graduationSchema";
import { Phone, Mail } from "lucide-react";
import Swal from "sweetalert2";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    personalPhoto: null,
    mobile: "",
    email: "",
    cityOfBirth: "",
    faculty: "",
    university: "",
    trackName: "",
    branch: "",
    itiGraduationYear: null,
    preferredTeachingBranches: [],
    preferredCoursesToTeach: [],
    fullJobTitle: "",
    companyName: "",
    yearsOfExperience: 0,
    hasFreelanceExperience: false,
    program: "",
    intake: null,
    interestedInTeaching: "",
    linkedin: "",
    isEmployed: false,
    freelancingIncome: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldValidateField = (fieldName, programValue) => {
    const PROFESSIONAL_TRAINING = "Professional Training Program - (9 Months)";
    const INTENSIVE_CODE_CAMP = "Intensive Code Camp - (4 Months)";

    if (!programValue) return true;

    switch (fieldName) {
      case "round":
        return programValue !== PROFESSIONAL_TRAINING;
      case "intake":
        return programValue !== INTENSIVE_CODE_CAMP;
      default:
        return true;
    }
  };

  const validateStep = async (currentStep, formData) => {
    try {
      const schema = stepValidationSchemas[currentStep];

      if (currentStep === 1) {
        const validationData = { ...formData };
        if (!shouldValidateField("round", formData.program)) {
          delete validationData.round;
        }
        if (!shouldValidateField("intake", formData.program)) {
          delete validationData.intake;
        }

        await schema.validate(validationData, { abortEarly: false });
      } else {
        await schema.validate(formData, { abortEarly: false });
      }

      return {};
    } catch (err) {
      const errors = {};

      err.inner.forEach((error) => {
        if (shouldValidateField(error.path, formData.program)) {
          errors[error.path] = error.message;
        }
      });

      return errors;
    }
  };

  const handleNext = async () => {
    const errors = await validateStep(currentStep, formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleBlur = async (e) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "number" && (value === "" || isNaN(value)) ? 0 : value;
    if (shouldValidateField(name, formData.program)) {
      const errors = await validateStep(currentStep, {
        ...formData,
        [name]: newValue,
      });

      setFormErrors((prev) => ({
        ...prev,
        [name]: errors[name] || "",
      }));
    }
  };

  const handleSelectBlur = async (name, value) => {
    if (shouldValidateField(name, formData.program)) {
      const errors = await validateStep(currentStep, {
        ...formData,
        [name]: value,
      });

      setFormErrors((prev) => ({
        ...prev,
        [name]: errors[name] || "",
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let loadingSwal;

    try {
      const errors = await validateStep(currentStep, formData);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      loadingSwal = Swal.fire({
        title: "Submitting...",
        text: "Please wait while we process your registration.",
        didOpen: () => {
          Swal.showLoading();
        },
        showConfirmButton: false,
        allowOutsideClick: false,
      });

      if (currentStep === steps.length - 1) {
        const response = await registrationApiRequest.createRegistrationRequest(
          formData
        );

        Swal.fire({
          title: "Thanks For Submit!",
          text: "Your Data has been Registered Successfully.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
      });
    } finally {
      if (loadingSwal) {
        loadingSwal.close();
      }
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="md:flex  bg-main-light h-6 px-2 text-text hidden lg:flex justify-end  ">
        <div className="text-main font-bold w-64   mr-8 flex justify-between ">
          <a
            href="tel:17002"
            className="flex justify-around w-20 align-baseline"
          >
            <Phone size={20} className="pt-1" /> 17002
          </a>
          <a href="mailto:ITIinfo@iti.gov.eg"> ITIinfo@iti.gov.eg</a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <nav className="w-full md:hidden bg-main-light p-2 sm:p-3">
          <div className="flex flex-row justify-between items-center">
            <img
              className="h-16 sm:h-14 mb-2 sm:mb-0"
              src="itiColoredLogo.svg"
              alt="ITI logo"
            />
            <div className="flex flex-col  items-start space-y-2 sm:space-y-2  text-main font-semibold text-xs sm:text-sm">
              <a href="tel:17002" className="flex  items-center">
                <Phone size={14} className="mr-1 text-main" /> 17002
              </a>
              <a href="mailto:ITIinfo@iti.gov.eg" className="flex items-center">
                <Mail size={14} className="mr-1 text-main" /> ITIinfo@iti.gov.eg
              </a>
            </div>
          </div>
        </nav>

        <aside className="shadow-md z-10 sticky top-0 w-full md:w-64 lg:w-80 mr-6  bg-main-light px-2 flex flex-col  gap-12  ">
          <StepIndicator currentStep={currentStep} />
          <img
            className="hidden md:block mt-28 self-center"
            src="itiColoredLogo.svg"
            alt="logo"
          />
        </aside>
        <div className="flex-1 px-6 py-10 space-y-4">
          <div className="min-h-px  max-h-full">
            {renderStep(
              currentStep,
              formData,
              setFormData,
              formErrors,
              handleBlur,
              handleSelectBlur
            )}
          </div>
          <div className="flex justify-between items-start md:px-10 md:gap-8 ">
            <Button
              onClick={() => handlePrevious(setCurrentStep)}
              text={"Previous"}
              variant={"outline"}
              className={`${
                currentStep > 0 ? "text-center w-32" : "invisible"
              } place-self-end`}
              disabled={isSubmitting}
            />

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                text={"NEXT"}
                className="place-self-end w-32 "
                disabled={isSubmitting}
              />
            ) : (
              <Button
                onClick={handleSubmit}
                text={"Submit"}
                className="place-self-end w-32 "
                disabled={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStepForm;
