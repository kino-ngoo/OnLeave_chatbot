// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// greeting.js defines the greeting dialog

// Import required Bot Builder
const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');

// User state for greeting dialog
const { UserProfile } = require('./userProfile');
const { LeaveProfile } = require('./leaveProfile');

// Minimum length requirements for id and name
const id_LENGTH_MIN = 6;
const NAME_LENGTH_MIN = 3;

// Dialog IDs 
const PROFILE_DIALOG = 'profileDialog';

// Prompt IDs
const NAME_PROMPT = 'namePrompt';
const id_PROMPT = 'idPrompt';

const VALIDATION_SUCCEEDED = true;
const VALIDATION_FAILED = !VALIDATION_SUCCEEDED;

/**
 * Demonstrates the following concepts:
 *  Use a subclass of ComponentDialog to implement a multi-turn conversation
 *  Use a Waterfall dialog to model multi-turn conversation flow
 *  Use custom prompts to validate user input
 *  Store conversation and user state
 *
 * @param {String} dialogId unique identifier for this dialog instance
 * @param {PropertyStateAccessor} userProfileAccessor property accessor for user state
 */
class Greeting extends ComponentDialog {
    constructor(dialogId, userProfileAccessor) {
        super(dialogId);

        // validate what was passed in
        if (!dialogId) throw ('Missing parameter.  dialogId is required');
        if (!userProfileAccessor) throw ('Missing parameter.  userProfileAccessor is required');

        // Add a water fall dialog with 4 steps.
        // The order of step function registration is importent
        // as a water fall dialog executes steps registered in order
        this.addDialog(new WaterfallDialog(PROFILE_DIALOG, [
            this.initializeStateStep.bind(this),
            this.promptForNameStep.bind(this),
            this.promptForidStep.bind(this),
            this.displayGreetingStep.bind(this)
        ]));

        // Add text prompts for name and id
        this.addDialog(new TextPrompt(NAME_PROMPT, this.validateName));
        this.addDialog(new TextPrompt(id_PROMPT, this.validateid));

        // Save off our state accessor for later use
        this.userProfileAccessor = userProfileAccessor;
    }
    /**
     * Waterfall Dialog step functions.
     * 
     * Initialize our state.  See if the WaterfallDialog has state pass to it
     * If not, then just new up an empty UserProfile object
     *
     * @param {WaterfallStepContext} step contextual information for the current step being executed
     */
    async initializeStateStep(step) {
        let userProfile = await this.userProfileAccessor.get(step.context);
        if (userProfile === undefined) {
            if (step.options && step.options.userProfile) {
                await this.userProfileAccessor.set(step.context, step.options.userProfile);
            } else {
                await this.userProfileAccessor.set(step.context, new UserProfile());
            }
        }
        return await step.next();
    }
    /**
     * Waterfall Dialog step functions.
     *
     * Using a text prompt, prompt the user for their name.
     * Only prompt if we don't have this information already.
     *
     * @param {WaterfallStepContext} step contextual information for the current step being executed
     */
    async promptForNameStep(step) {
        const userProfile = await this.userProfileAccessor.get(step.context);
        // if we have everything we need, greet user and return
        if (userProfile !== undefined && userProfile.name !== undefined && userProfile.id !== undefined) {
            return await this.greetUser(step);
        }
        if (!userProfile.name) {
            // prompt for name, if missing
            return await step.prompt(NAME_PROMPT, 'What is your name?');
        } else {
            return await step.next();
        }
    }
    /**
     * Waterfall Dialog step functions.
     *
     * Using a text prompt, prompt the user for the id in which they live.
     * Only prompt if we don't have this information already.
     *
     * @param {WaterfallStepContext} step contextual information for the current step being executed
     */
    async promptForidStep(step) {
        // save name, if prompted for
        const userProfile = await this.userProfileAccessor.get(step.context);
        if (userProfile.name === undefined && step.result) {
            let lowerCaseName = step.result;
            // capitalize and set name
            userProfile.name = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.substr(1);
            await this.userProfileAccessor.set(step.context, userProfile);
        }
        if (!userProfile.id) {
            return await step.prompt(id_PROMPT, `Hello ${ userProfile.name }, what is your id ?`);
        } else {
            return await step.next();
        }
    }
    /**
     * Waterfall Dialog step functions.
     *
     * Having all the data we need, simply display a summary back to the user.
     *
     * @param {WaterfallStepContext} step contextual information for the current step being executed
     */
    async displayGreetingStep(step) {
        // Save id, if prompted for
        const userProfile = await this.userProfileAccessor.get(step.context);
        if (userProfile.id === undefined && step.result) {
            let lowerCaseid = step.result;
            // capitalize and set id
            userProfile.id = lowerCaseid.charAt(0).toUpperCase() + lowerCaseid.substr(1);
            await this.userProfileAccessor.set(step.context, userProfile);
        }
        return await this.greetUser(step);
    }
    /**
     * Validator function to verify that user name meets required constraints.
     *
     * @param {PromptValidatorContext} validation context for this validator.
     */
    async validateName(validatorContext) {
        // Validate that the user entered a minimum length for their name
        const value = (validatorContext.recognized.value || '').trim();
        if (value.length >= NAME_LENGTH_MIN) {
            return VALIDATION_SUCCEEDED;
        } else {
            await validatorContext.context.sendActivity(`Names need to be at least ${ NAME_LENGTH_MIN } characters long.`);
            return VALIDATION_FAILED;
        }
    }
    /**
     * Validator function to verify if id meets required constraints.
     *
     * @param {PromptValidatorContext} validation context for this validator.
     */
    async validateid(validatorContext) {
        // Validate that the user entered a minimum length for their name
        const value = (validatorContext.recognized.value || '').trim();
        if (value.length >= id_LENGTH_MIN) {
            return VALIDATION_SUCCEEDED;
        } else {
            await validatorContext.context.sendActivity(`id needs to be at least ${ id_LENGTH_MIN } characters long.`);
            return VALIDATION_FAILED;
        }
    }
    /**
     * Helper function to greet user with information in greetingState.
     *
     * @param {WaterfallStepContext} step contextual information for the current step being executed
     */
    async greetUser(step) {
        const userProfile = await this.userProfileAccessor.get(step.context);
        // Display to the user their profile information and end dialog
        await step.context.sendActivity(`Hi ${ userProfile.id } ${ userProfile.name }, nice to meet you!`);
        await step.context.sendActivity(`You can always say 'My name is <your name> to reintroduce yourself to me.`);
        return await step.endDialog();
    }
}

exports.GreetingDialog = Greeting;
