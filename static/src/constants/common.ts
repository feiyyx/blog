export const REM_SIZE = 16;

export const calRemSize = (size: number): number => {
	return size / REM_SIZE;
};

export const calRemToPixels = (size: number): number => {
	return size * REM_SIZE;
};
