// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Simple user profile class.
 */
class LeaveProfile {
    constructor(annual, flexible, compensation, personal, sick) {
        this.annual = annual || undefined;				//texiu
        this.flexible = flexible || undefined;			//tanxingxiujia
        this.compensation = compensation || undefined;	//buxiu
        this.personal = personal || undefined;			//shijia
        this.sick = sick || undefined;					//bingjia
    }
};

exports.LeaveProfile = LeaveProfile;
