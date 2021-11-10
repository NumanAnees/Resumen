var config = {
  adminEmail:"ayobacabuku.ind@gmail.com",  // The website will consider this email  as an admin 
  brand: {
    useImg: true,  // 320X70 Preferable Size , replace with true if you want to use image logo. and keep false if you want to keep the logo as text
    name: "Buat CV"  // This will be shown in the absence of the logo
  },
  paypalClienID:"AQ6HBHBxXvDYYxcGWa34DMvI9ywriPyRdQvEtO2Nx24i-Flo4RiKbG0kit9HFGe9sfTnN6DtrKgatUgj", 
  stripe_publishable_key:"pk_test_51IZbSFKcjLOayGZuxoP6THn0XX1m58w4ER2MxMKIjOgIaKsFINTt9Vi8OnfvcV2WaCjhB24mxNpMY1dMEciebpgW00hegvTU6L",  // Make sure its th publishable key
  backendUrl:"buatcv.co.id"  // our domain in this format :  domain.com . if you use subdomain for the app then it should be like : subdomain.domain.com 
}
export default config