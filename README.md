# Epoch App

Bringing refugees and communities together

## Run

The web app is run from inside the 'epoch' directory. It requires that you copy in the file firebaseConfig.ts to the 'epoch/src' directory containing the following data:

```
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "..."
}
```

To launch, install the proper packages with `npm install` and run with the command `ionic serve`.

## Notes

Created using Ionic and Firebase.
