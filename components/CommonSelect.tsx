import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface CommonSelectFieldProps {
	myControl: any;
	myOptions: any;
	fieldName: string;
	fieldLabel: string;
	fieldRules: any;
	defaultValue?: string;
	setFieldValue?: any;
}

const CommonSelectField = ({
	myControl,
	myOptions,
	fieldName,
	fieldLabel,
	fieldRules,
	defaultValue,
	setFieldValue,
}: CommonSelectFieldProps) => {
	useEffect(() => {
		setFieldValue ? setFieldValue(fieldName, defaultValue) : null;
	}, [defaultValue, fieldName, setFieldValue]);

	return (
		<Controller
			control={myControl}
			name={fieldName}
			rules={fieldRules}
			defaultValue={defaultValue ?? ""}
			render={({ field: { onChange }, fieldState: { error } }) => (
				<div className="flex flex-col gap-y-1">
					<label className="text-sm font-semibold tracking-wider">
						{fieldLabel}
						{fieldRules ? <span className="text-rose-500 pl-1">*</span> : null}
					</label>
					<select
						id={fieldName}
						className={`w-full bg-gray-100 border-2 border-transparent focus:outline-none focus:border-[#89644e] px-2 py-1 rounded-md appearance-none`}
						onChange={onChange}
						defaultValue={defaultValue ?? ""}
					>
						<option
							disabled
							value=""
						></option>
						{myOptions.map((option: any) => {
							return (
								<option
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							);
						})}
					</select>
					{error && <p className="text-xs text-rose-500">{error.message}</p>}
				</div>
			)}
		/>
	);
};

export default CommonSelectField;
