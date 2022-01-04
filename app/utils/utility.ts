export const awaitTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const jsonResponse = (status: number, data: any, init?: ResponseInit) => {
	return new Response(JSON.stringify(data), {
		...init,
		status,
		headers: {
			...init?.headers,
			'Content-Type': 'application/json',
		},
	})
}

export const roundToFixed = (num: number | string, toFix: number = 2) => {
	return +(Math.round(Number(num + `e+${toFix}`))  + `e-${toFix}`);
}

export const blobCreationFromURL = (inputURI: string) => {
	let binaryVal;

	let inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];

	if (inputURI.split(',')[0].indexOf('base64') >= 0) {
		binaryVal = atob(inputURI.split(',')[1]);
	} else {
		binaryVal = unescape(inputURI.split(',')[1]);
	}

	let blobArray: any = [];
	for (let index = 0; index < binaryVal.length; index++) {
		blobArray.push(binaryVal.charCodeAt(index));
	}

	return new Blob([blobArray], {
		type: inputMIME
	});
}

export const throttle = (func: any, timeFrame: number) => {
	let lastTime = 0;
	return function () {
		let now: any = new Date();
		if (now - lastTime >= timeFrame) {
			func();
			lastTime = now;
		}
	};
}

export const businessSectorMap = (data: any) => {
	if(!data) return [];
	const result = (data: any) => {
		return data.reduce((total: any, item: any, index: number) => {
			total.push({
				...item,
				value: item.id
			})
			if(item.children && item.children.length > 0) {
				total[index]['children'] = result(item.children);
				total[index]['selectable'] = false;
			}
			return total;
		}, [])
	}
	return result(data)
}