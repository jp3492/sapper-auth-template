import * as admin from 'firebase-admin';

import serviceAccount from './testing-auth-c1e75-firebase-adminsdk-jzvx5-48541ec80f.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testing-auth-c1e75.firebaseio.com"
});

export default admin;