import Input from "../../components/Ui/Input";
import {
  handleInputChange,
  handleSelectChange,
} from "../../services/registerFormUtils";
import Data from "../../SelectOption.json";
import SelectComponent from "../../components/Ui/SelectComponent";
const StepWorkExperience = ({
  formData,
  setFormData,
  formErrors,
  handleBlur,
  handleSelectBlur,
}) => {
  const optionsFreelanceGain = Data.FreeLanceGain?.map((gain) => ({
    value: gain.value,
    label: gain.label,
  }));
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-2xl text-center w-full text-main">
        Work Experience
      </h1>
      <div className="w-max-xl md:p-10">
        <div>
          <Input
            label="Job Title"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange(e, setFormData)}
            onBlur={(e) => handleBlur(e)}
            // required={formData.isWork === true}
            errorMessage={formErrors.jobTitle}
            disabled={formData.isWork === true ? false : true}
          />
        </div>
        <div>
          <Input
            label="Company Name"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange(e, setFormData)}
            onBlur={(e) => handleBlur(e)}
            //required={formData.isWork === true}
            errorMessage={formErrors.companyName}
            disabled={formData.isWork === true ? false : true}
          />
        </div>
        <div>
          <Input
            label="years Of Experience"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={(e) => handleInputChange(e, setFormData)}
            onBlur={(e) => handleBlur(e)}
            //required={formData.isWork === true}
            errorMessage={formErrors.yearsOfExperience}
            disabled={formData.isWork === true ? false : true}
          />
        </div>

        <div>
          <SelectComponent
            options={optionsFreelanceGain}
            label="The Money You gained from Freelancing Jop"
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "freeLancingGain", setFormData)
            }
            value={
              optionsFreelanceGain?.find(
                (option) => option.value === formData.freeLancingGain
              ) || null
            }
            onBlur={() =>
              handleSelectBlur("freeLancingGain", formData.freeLancingGain)
            }
            name="freeLancingGain"
            placeholder="FreeLancing Gain"
            //required={formData.isFreelancer === true}
            errorMessage={formErrors.freeLancingGain}
            disabled={formData.isFreelancer === true ? false : true}
          />
        </div>
        <div className="md:flex gap-6 w-[290px]  items-end">
          <Input
            label="Is Freelancer"
            id="isFreelancer"
            name="isFreelancer"
            type="checkbox"
            className="flex flex-row-reverse gap-2  w-32 py-3"
            checked={formData.isFreelancer}
            onChange={(e) => handleInputChange(e, setFormData)}
          />
          <Input
            label="Have Work"
            id="isWork"
            name="isWork"
            type="checkbox"
            className="flex flex-row-reverse gap-2 mt-5  w-32 py-3"
            checked={formData.isWork}
            onChange={(e) => handleInputChange(e, setFormData)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepWorkExperience;
