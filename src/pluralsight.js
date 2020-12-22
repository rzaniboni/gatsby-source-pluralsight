"use strict";

const got = require("got");

const baseUrl = "https://app.pluralsight.com";

function getUserProfileUrl(username) {
  return `${baseUrl}/profile/${username}`;
}

function getProfileDataUrl(handle, type) {
  const endpoints = [
    "activityinsights",
    "completedcourses",
    "currentlylearning",
    "details",
    "interests",
    "skillmeasurements",
  ];
  if (!handle) {
    throw Error("Need the user handle");
  }
  if (endpoints.indexOf(type) < 0) {
    throw Error("Invalid data endpoint");
  }
  return `${baseUrl}/profile/data/${type}/${handle}`;
}

async function getProfileData(handle, type) {
  const url = getProfileDataUrl(handle, type);
  return got(url, { json: true }).then((response) => response.body);
}

async function getProfileDetails(handle) {
  return getProfileData(handle, "details");
}

async function getProfileCompletedCourses(handle) {
  return getProfileData(handle, "completedcourses");
}

async function getProfileSkills(handle) {
  return getProfileData(handle, "skillmeasurements");
}

async function getUserHandle(username) {
  if (!username) {
    throw Error("Please add your Pluralsight username to the configuration.");
  }
  const url = getUserProfileUrl(username);
  return got(url)
    .then((response) => {
      const payloadScript = response.body.match(
        /window.detailsPayload = '.*';/gim
      );
      if (payloadScript.length <= 0) {
        return Error("Pluralsight payload script not found.");
      }
      const payload = payloadScript[0].split("'")[1];
      if (payload.length <= 0) {
        return Error("Pluralsight payload data not found.");
      }
      // const decoded = Buffer.from(payload, 'base64').toString('utf8')
      const user = JSON.parse(payload);
      return user.handle;
    })
    .catch((error) => {
      throw Error(
        `Failed to retrieve user id. Did you specify a valid username? Is your profile public?\n${error.message}`
      );
    });
}

module.exports.getProfileCompletedCourses = getProfileCompletedCourses;
module.exports.getProfileDetails = getProfileDetails;
module.exports.getProfileSkills = getProfileSkills;
module.exports.getUserHandle = getUserHandle;
