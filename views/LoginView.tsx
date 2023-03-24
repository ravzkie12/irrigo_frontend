import React from "react";
import AuthButton from "../components/AuthButton";
import AuthInputField from "../components/AuthInputField";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fieldRules } from "../components/authHelper";
import {
	loginUser,
	onSuccessfulAuth,
	retrieveAccount,
} from "../redux/authSlice";
import AlertModal from "../components/AlertModal";
import useAlert from "../hooks/useAlert";
import jwt_decode from "jwt-decode";

// #89644e

const LoginView = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { handleSubmit, control } = useForm();
	const { loginEmail, loginPassword, requestStatus } = useAppSelector(
		(state: any) => state.authState
	);
	const { showAlert, onShowAlert, onCloseAlert } = useAlert();

	const onClickLink = (path: string) => {
		router.push(path);
	};

	const onLoginUser = (formData: any) => {
		dispatch(
			loginUser({
				loginEmail: formData.loginEmail,
				loginPassword: formData.loginPassword,
			})
		).then((response) => {
			onShowAlert();
			if (response.payload?.access) {
				let decoded_token: any = jwt_decode(response.payload.access);
				dispatch(onSuccessfulAuth(200));
				dispatch(retrieveAccount(decoded_token.user_id)).then((response) => {
					router.push(`/${response.payload.role}`);
				});
				return;
			}
			dispatch(onSuccessfulAuth(404));
		});
	};

	return (
		<div className="w-full h-screen grid grid-cols-login font-noto text-gray-700">
			{/*  */}
			<div className="relative w-full bg-white flex flex-col gap-y-8 justify-center items-center px-20">
				{/*  */}
				<div className="absolute top-10 left-10 flex justify-between items-center">
					<div className="flex gap-x-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 24 24"
							className="w-7 h-7 text-[#89644e]"
						>
							<path
								fill="currentColor"
								d="M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62c.41 2.22 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87z"
							/>
						</svg>
						<h4 className="text-4xl text-[#89644e] font-black tracking-widest">
							Irrigo.
						</h4>
					</div>
				</div>
				<button
					className="absolute top-12 right-10 text-[#89644e] font-medium text-lg"
					onClick={() => onClickLink("/register")}
				>
					Register
				</button>
				{/*  */}
				<div className="flex flex-col gap-y-1">
					<h4 className="text-3xl font-bold tracking-wide">Login</h4>
					<p className="tracking-wide">
						Enter account credentials to proceed with{" "}
						<span className="text-[#89644e] font-bold tracking-widest">
							Irrigo.
						</span>
					</p>
				</div>
				<AuthInputField
					myControl={control}
					fieldType="text"
					fieldName="loginEmail"
					fieldLabel="Email"
					fieldRules={fieldRules.requiredEmailRule}
					defaultValue={loginEmail}
				/>
				<AuthInputField
					myControl={control}
					fieldType="password"
					fieldName="loginPassword"
					fieldLabel="Password"
					fieldRules={fieldRules.requiredRule}
					defaultValue={loginPassword}
				/>
				<AuthButton
					buttonText="Sign In"
					onClickButton={handleSubmit(onLoginUser)}
				/>
				<p className="text-sm font-light">
					Don&apos;t have an account?{" "}
					<button
						className="text-[#89644e] font-medium"
						onClick={() => onClickLink("/register")}
					>
						Register
					</button>
				</p>
			</div>
			{/*  */}
			<div className="relative w-full bg-login bg-cover flex flex-col justify-center items-center px-10">
				{showAlert && requestStatus !== 200 && (
					<AlertModal
						alertText="Failed to login, please check account credentials"
						alertType="error"
						onAlertClick={onCloseAlert}
					/>
				)}
				{/*  */}
				<div className="absolute w-full h-screen bg-gradient-to-b from-stone-700 to-[#89644e]  opacity-70"></div>
				{/*  */}
				<div className="z-10 flex flex-col gap-y-5">
					{/*  */}
					<div className="flex gap-x-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="xMidYMid meet"
							viewBox="0 0 24 24"
							className="w-8 h-8 text-white"
						>
							<path
								fill="currentColor"
								d="M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62c.41 2.22 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87z"
							/>
						</svg>
						<h4 className="text-6xl text-white font-black tracking-widest">
							Irrigo.
						</h4>
					</div>
					{/*  */}
					<p className="text-xl text-white font-light tracking-wider">
						Soil Moisture Heat Map & Monitoring Information System
					</p>
				</div>
				{/*  */}
			</div>
		</div>
	);
};

export default LoginView;
