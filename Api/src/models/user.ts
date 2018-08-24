import { Schema, model } from "mongoose";

let userSchema: Schema = new Schema({
    username: {
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        unique: true,
        required: true
    },
    streamKey: {
        type: String,
        default: '',
        required: true,
        unique: false
    },
    admin: {
        type: Boolean,
        default: false,
    },
    streaming: {
        required: false,
        live: {
            type: Boolean,
            required: true,
            default: false
        },
        title: {
            type: String,
            required: true,
            default: 'edfjdiojf'
        }
    }
}, { timestamps: true });

export default model("User", userSchema);