class SatelliteRequestDto {
	constructor() {
		this.latitude;
		this.longitude;
		this.start;
		this.end;
		this.step;
		this.threadCat;
	}

	static parseRequest(params) {
		let satReq = new SatelliteRequestDto();
		satReq.latitude = params.latitude;
		satReq.longitude = params.longitude;
		satReq.start = params.start;
		satReq.end = params.end;
		satReq.step = params.step;
		satReq.threadCat = params.threadCat;

		return satReq;
	}
}

module.exports = {
	SatelliteRequestDto: SatelliteRequestDto
};
