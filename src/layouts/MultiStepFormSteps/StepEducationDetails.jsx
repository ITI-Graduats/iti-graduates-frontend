import Input from "../../components/Ui/Input";
import {
  handleInputChange,
  handleSelectChange,
} from "../../services/registerFormUtils";
import Data from "../../SelectOption.json";
import SelectComponent from "../../components/Ui/SelectComponent";
import { useBranchesAndTracks } from "../../contexts/BranchesAndTracksContext";

const StepEducationDetails = ({
  formData,
  setFormData,
  formErrors,
  handleBlur,
  handleSelectBlur,
}) => {
  const { tracks, branches } = useBranchesAndTracks();

  const optionsUniversity = Data.Universities?.map((university) => ({
    value: university.value,
    label: university.label,
  }));
  const optionsProgram = Data.Program?.map((program) => ({
    value: program.value,
    label: program.label,
  }));
  const optionsIntake = Data.intake?.map((intake) => ({
    value: intake.value,
    label: intake.label,
  }));
  const optionsFactualy = Data.faculties?.map((faculty) => ({
    value: faculty.value,
    label: faculty.label,
  }));

  const optionTrack = Array.from(
    new Set(tracks?.map((track) => track?.name))
  ).map((name) => ({
    value: name,
    label: name,
  }));

  const optionbranch = Array.from(
    new Set(branches?.map((branch) => branch?.name))
  ).map((name) => ({
    value: name,
    label: name,
  }));
  return (
    <div className="space-y-10">
      <h1 className="font-bold text-2xl text-center w-full text-main">
        Education Details
      </h1>
      <div className="w-max-xl md:px-10 pb-5">
        <div>
          <div>
            <SelectComponent
              options={optionsUniversity}
              label="University"
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "university", setFormData)
              }
              onBlur={() => handleSelectBlur("university", formData.university)}
              value={
                optionsUniversity.find(
                  (option) => option.value === formData.university
                ) || null
              }
              name="university"
              placeholder="Select your university"
              isCreatable
              required
              errorMessage={formErrors.university}
            />
          </div>

          <div>
            <SelectComponent
              options={optionsFactualy}
              label="Faculty"
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "faculty", setFormData)
              }
              onBlur={() => handleSelectBlur("faculty", formData.faculty)}
              value={
                optionsFactualy.find(
                  (option) => option.value === formData.faculty
                ) || null
              }
              name="faculty"
              placeholder="Select your faculty"
              isCreatable
              required
              errorMessage={formErrors.faculty}
            />
          </div>

          <div>
            <SelectComponent
              options={optionbranch}
              label="Iti branch you Graduted from"
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "branch", setFormData)
              }
              onBlur={() => handleSelectBlur("branch", formData.branch)}
              value={
                optionbranch?.find(
                  (option) => option.value === formData.branch
                ) || null
              }
              name="branch"
              placeholder="Select your ITI branch"
              required
              errorMessage={formErrors.branch}
            />
          </div>

          <div>
            <SelectComponent
              options={optionTrack}
              label="Track"
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "trackName", setFormData)
              }
              onBlur={() => handleSelectBlur("trackName", formData.trackName)}
              value={
                optionTrack?.find(
                  (option) => option.value === formData.trackName
                ) || null
              }
              name="trackName"
              placeholder="Select your track"
              required
              errorMessage={formErrors.trackName}
            />
          </div>

          <div>
            <SelectComponent
              options={optionsProgram}
              label="Program"
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "program", setFormData)
              }
              onBlur={() => handleSelectBlur("program", formData.program)}
              value={
                optionsProgram?.find(
                  (option) => option.value === formData.program
                ) || null
              }
              name="program"
              placeholder="Select your program"
              required
              errorMessage={formErrors.program}
            />
          </div>

          <div>
            <SelectComponent
              options={optionsIntake}
              label="Intake"
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "intake", setFormData)
              }
              onBlur={() => handleSelectBlur("intake", formData.intake)}
              value={
                optionsIntake?.find(
                  (option) => option.value === formData.intake
                ) || null
              }
              name="intake"
              placeholder="Select your intake"
              required
              errorMessage={formErrors.intake}
            />
          </div>

          <div>
            <Input
              label="Graduation Year From ITI"
              id="itiGraduationYear"
              name="itiGraduationYear"
              value={formData.itiGraduationYear}
              placeholder="Enter your ITI graduation year"
              onChange={(e) => handleInputChange(e, setFormData)}
              onBlur={(e) => handleBlur(e)}
              required
              errorMessage={formErrors.itiGraduationYear}
              type="Number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepEducationDetails;
