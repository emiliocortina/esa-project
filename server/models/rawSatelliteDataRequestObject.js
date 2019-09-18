class SatelliteRequestDto {
	constructor() {
		this.latitude = null;
		this.longitude = null;
		this.start = null;
		this.end = null;
		this.step = null;
		this.threadCat = null;
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
