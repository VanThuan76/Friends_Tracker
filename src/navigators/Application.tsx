import { useAppSelector } from "@/hooks/useRedux";
import React from "react";
import AuthNavigator from "./AuthNavigator";

import MainNavigator from './MainNavigator';

function ApplicationNavigator() {
	const isLogined = useAppSelector(state => state.isLogined)
	return (
		<>
			{!isLogined ? <MainNavigator /> : <AuthNavigator />}
		</>
	);
}

export default ApplicationNavigator;
