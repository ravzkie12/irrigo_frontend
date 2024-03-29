import React, { useCallback, useState, useEffect } from "react";
import NextButton from "../../../components/RSBSAButton";
import PreviousButton from "../../../components/RSBSASecondaryButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	onPrevStep,
	onUploadFile,
	onRemoveFile,
	updateAccount,
} from "../../../redux/dataSlice";
import { useDropzone } from "react-dropzone";
import jwtDecode from "jwt-decode";
import { retrieveAccount } from "../../../redux/authSlice";

const Step4 = () => {
	const dispatch = useAppDispatch();
	const { userProfile } = useAppSelector((state) => state.authState);
	const { ownershipDocumentName, signatureName, ownershipDocument, signature } =
		useAppSelector((state) => state.dataState);

	const [hasError, setHasError] = useState(false);

	const getImageBase64 = (file: any, fieldName: string) => {
		var reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = function () {
			dispatch(onUploadFile({ name: fieldName, value: reader.result }));
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	};

	const onDropDocument = useCallback(
		(files: any) => {
			dispatch(
				onUploadFile({ name: "ownershipDocumentName", value: files[0].path })
			);
			getImageBase64(files, "ownershipDocument");
		},
		[ownershipDocumentName]
	);

	const onDropSignature = useCallback(
		(files: any) => {
			dispatch(onUploadFile({ name: "signatureName", value: files[0].path }));
			getImageBase64(files, "signature");
		},
		[signatureName]
	);

	const {
		acceptedFiles: acceptedDocumentFiles,
		getRootProps: getDocumentRootProps,
		getInputProps: getDocumentInputProps,
	} = useDropzone({
		accept: {
			"image/jpeg": [],
			"image/png": [],
			"application/pdf": [],
		},
		onDrop: onDropDocument,
	});

	const {
		acceptedFiles: acceptedSignatureFiles,
		getRootProps: getSignatureRootProps,
		getInputProps: getSignatureInputProps,
	} = useDropzone({
		accept: {
			"image/jpeg": [],
			"image/png": [],
		},
		onDrop: onDropSignature,
	});

	const handleRemoveDocument = () => {
		acceptedDocumentFiles.pop();
		dispatch(onRemoveFile("ownershipDocument"));
		dispatch(onRemoveFile("ownershipDocumentName"));
	};

	const handleRemoveSignature = () => {
		acceptedSignatureFiles.pop();
		dispatch(onRemoveFile("signature"));
		dispatch(onRemoveFile("signatureName"));
	};

	const handleSubmitRSBSA = () => {
		if (!ownershipDocumentName || !signatureName) {
			setHasError(true);
			return;
		}
		dispatch(updateAccount()).then(() => {
			let decoded_token: any = jwtDecode(localStorage.jwt_token);
			dispatch(retrieveAccount(decoded_token.user_id));
		});
	};

	useEffect(() => {
		// Ownership Document
		userProfile.ownership_document_name.length
			? dispatch(
					onUploadFile({
						name: "ownershipDocumentName",
						value: userProfile.ownership_document_name,
					})
			  )
			: null;
		userProfile.ownership_document.length
			? dispatch(
					onUploadFile({
						name: "ownershipDocument",
						value: userProfile.ownership_document,
					})
			  )
			: null;
		//   Signature
		userProfile.signature_name.length
			? dispatch(
					onUploadFile({
						name: "signatureName",
						value: userProfile.signature_name,
					})
			  )
			: null;
		userProfile.signature.length
			? dispatch(
					onUploadFile({
						name: "signature",
						value: userProfile.signature,
					})
			  )
			: null;
	}, []);

	return (
		<div className="w-[90%] flex flex-col gap-y-5">
			{/*  */}
			<h4 className="text-base text-center">
				Upload ownership document / proof & signature below:
			</h4>
			{/*  */}
			<div className="grid grid-cols-2 gap-x-8">
				<div className="flex flex-col gap-y-1">
					<h4 className="mt-5 text-sm font-medium">
						Ownership Document / Proof
					</h4>
					{/*  */}
					{ownershipDocumentName.length ? (
						<div className="relative bg-gray-100 border-2 border-dashed border-gray-400 h-48 rounded-lg flex justify-center items-center">
							<button
								type="button"
								onClick={handleRemoveDocument}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="absolute h-6 w-6 top-5 right-5 text-red-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
							<div className="flex items-center gap-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-[#89644e]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p className="font-int text-xs text-[#89644e]">
									{ownershipDocumentName}
								</p>
							</div>
						</div>
					) : (
						<div
							className={`relative bg-gray-100 border-2 border-dashed border-gray-400 h-48 rounded-lg flex justify-center items-center`}
							{...getDocumentRootProps()}
						>
							<input
								{...getDocumentInputProps()}
								className="w-full h-full"
							/>
							<p className="font-int text-sm text-gray-600 font-light">
								Drop files here or{" "}
								<span className="text-[#89644e] font-medium cursor-pointer">
									browse
								</span>
							</p>
						</div>
					)}
				</div>
				<div className="flex flex-col gap-y-1">
					<h4 className="mt-5 text-sm font-medium">Signature</h4>
					{signatureName.length ? (
						<div className="relative bg-gray-100 border-2 border-dashed border-gray-400 h-48 rounded-lg flex justify-center items-center">
							<button
								type="button"
								onClick={handleRemoveSignature}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="absolute h-6 w-6 top-5 right-5 text-red-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
							<div className="flex items-center gap-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-[#89644e]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p className="font-int text-xs text-[#89644e]">
									{signatureName}
								</p>
							</div>
						</div>
					) : (
						<div
							className={`relative bg-gray-100 border-2 border-dashed border-gray-400 h-48 rounded-lg flex justify-center items-center`}
							{...getSignatureRootProps()}
						>
							<input
								{...getSignatureInputProps()}
								className="w-full h-full"
							/>
							<p className="font-int text-sm text-gray-600 font-light">
								Drop files here or{" "}
								<span className="text-[#89644e] font-medium cursor-pointer">
									browse
								</span>
							</p>
						</div>
					)}
				</div>
				{hasError && (
					<p className="mt-2 text-xs text-rose-500">Both fields are required</p>
				)}
				{/*  */}
				<div className="flex flex-col gap-y-5">
					<h4 className="mt-5 text-sm font-medium">
						Preview (Ownership Document / Proof)
					</h4>
					<div className="h-96 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden flex justify-center items-center">
						<img
							src={ownershipDocument}
							className="h-auto max-w-full"
						/>
					</div>
				</div>
				{/*  */}
				<div className="flex flex-col gap-y-5">
					<h4 className="mt-5 text-sm font-medium">Preview (Signature)</h4>
					<div className="h-96 border-2 border-dashed border-gray-400 rounded-lg overflow-hidden flex justify-center items-center">
						<img
							src={signature}
							className="h-auto max-w-full"
						/>
					</div>
				</div>
			</div>
			{/*  */}
			<div className="mt-10 mb-5 w-full flex justify-between">
				<PreviousButton
					buttonText="Previous"
					onClickButton={() => dispatch(onPrevStep())}
				/>
				<NextButton
					buttonText="Submit"
					onClickButton={handleSubmitRSBSA}
				/>
			</div>
		</div>
	);
};

export default Step4;
