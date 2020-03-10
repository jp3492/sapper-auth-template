import admin from '../firebase';

const authenticated_api = [
  "POST::/api/test"
]

const authenticated_routes = [
  "GET::/profile"
]

const authenticationMiddleware = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.__session || '';
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    req.user = decodedClaims.user_id;
  } catch (error) {
    req.user = null;
  } finally {
    const route_id = `${req.method}::${req.url}`;

    if (authenticated_api.includes(route_id)) {
      if (req.user !== null) {
        next();
      } else {
        res.status(403).end(JSON.stringify({ status: "forbidden" }))
      }
    } else if (authenticated_routes.includes(route_id)) {
      if (req.user !== null) {
        next();
      } else {
        res.redirect('/auth/login');
      }
    } else {
      next();
    }
  }
}

export default authenticationMiddleware;