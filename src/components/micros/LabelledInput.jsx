
import { toFirstUpper } from "../../utils/util-functions";

const LabelledInput = ({title,type="text", isRequired, register , errors}) => {
  return (
    <>
      <label className="label">
        <span className="label-text">{toFirstUpper(title)} {isRequired && "*"}</span>
      </label>
      <input
        type={type}
        placeholder={title.toLowerCase()}
        className="input input-bordered"
        {...register(title, { required: isRequired })}
        aria-invalid={errors[title] ? "true" : "false"}
      />
      {errors[title]?.type === "required" && (
        <p role="alert" className="text-xs text-error">
          {toFirstUpper(title.toLowerCase())} is required
        </p>
      )}
    </>
  );
};

export default LabelledInput;
