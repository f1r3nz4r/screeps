
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: ["node_modules/**"]
    },
    {
        files: ["src/**/*.js"],

        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "commonjs",
            globals: {
                ...globals.es2020,
                ...globals.commonjs,

                Game: "readonly",
                Memory: "readonly",
                RawMemory: "readonly",
                InterShardMemory: "readonly",
                PathFinder: "readonly",
                RoomPosition: "readonly",
                RoomVisual: "readonly",
                _: "readonly",

                // Screeps exposes many global constants.
                // Add others here as needed.
                FIND_SOURCES: "readonly",
                FIND_SOURCES_ACTIVE: "readonly",
                FIND_MY_SPAWNS: "readonly",
                RESOURCE_ENERGY: "readonly",
                OK: "readonly",
                ERR_NOT_IN_RANGE: "readonly"
            }
        },

        rules: {
            ...js.configs.recommended.rules,
            "no-unused-vars": "warn",
            "no-undef": "error",
            "eqeqeq": ["warn", "always"]
        }
    }
];
