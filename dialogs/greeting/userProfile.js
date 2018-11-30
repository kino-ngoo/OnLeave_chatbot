// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Simple user profile class.
 */
class UserProfile {
    constructor(name, id, type, time) {
        this.name = name || undefined;
        this.id = id || undefined;
        this.type = type || undefined;
        this.time = time || undefined;
    }
};

exports.UserProfile = UserProfile;