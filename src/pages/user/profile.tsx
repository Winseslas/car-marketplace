import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs"; // Import Breadcrumbs
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SaveCarModal from "../../components/SaveCarModal";
export default function Profile() {
  const { t } = useTranslation();
  const location = useLocation();

  // Fonction pour déterminer si le lien est actif
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div>
      <style>
        {`
          .active-link {
            position: relative;
          }
          .active-link::after {
            left: 0;
            bottom: 0;
            height: 3px;
            width: 100%;
            content: '';
            display: block;
            position: absolute;
            border-radius: 5%;
            background-color: currentColor;
          }
        `}
      </style>
      <Header />
      <div className="container mx-auto p-6 bg-white rounded-lg">
        <div className="mb-20">
          <Breadcrumbs />
        </div>
        <h1 className="text-3xl font-bold mb-4">
          {t("pages.profilePage.title")}
        </h1>
        <div
          className="mb-4 flex items-center list-none flex-row flex-wrap border-b-0 ps-0 rounded-xl shadow"
          style={{ backgroundColor: "#e6edf7", height: "4rem" }}
        >
          <div className="flex-1 flex items-center ml-2">
            <Link
              className={`px-4 py-5 cursor-pointer ${
                isActive("my-listing")
                  ? "text-blue-600 active-link"
                  : "text-black"
              } sm:text-xs sm:py-6 md:text-base md:py-5`}
              to={"my-listing"}
              style={{
                fontStyle: isActive("my-listing") ? "italic" : "normal",
                color: isActive("my-listing") ? "#646cff" : "black",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
              }}
            >
              {t("pages.profilePage.myListing")}
            </Link>
            <Link
              className={`px-4 py-5 cursor-pointer ${
                isActive("favorites")
                  ? "text-blue-600 active-link"
                  : "text-black"
              } sm:text-xs sm:py-6 md:text-base md:py-5`}
              to={"favorites"}
              style={{
                fontStyle: isActive("favorites") ? "italic" : "normal",
                color: isActive("favorites") ? "#646cff" : "black",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
              }}
            >
              {t("pages.profilePage.favorites")}
            </Link>
            <Link
              className={`px-4 py-5 cursor-pointer ${
                isActive("settings")
                  ? "text-blue-600 active-link"
                  : "text-black"
              } sm:text-xs sm:py-6 md:text-base md:py-5`}
              to={"settings"}
              style={{
                fontStyle: isActive("settings") ? "italic" : "normal",
                color: isActive("settings") ? "#646cff" : "black",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
              }}
            >
              {t("pages.profilePage.settings")}
            </Link>
            <Link
              className={`px-4 py-5 cursor-pointer ${
                isActive("billing") ? "text-blue-600 active-link" : "text-black"
              } sm:text-xs sm:py-6 md:text-base md:py-5`}
              to={"billing"}
              style={{
                fontStyle: isActive("billing") ? "italic" : "normal",
                color: isActive("billing") ? "#646cff" : "black",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
              }}
            >
              {t("pages.profilePage.billing")}
            </Link>

            {isActive("my-listing") && (
              <div className="flex-1 flex items-center justify-end mr-10">
                {/* <Button variant="default" 
                size="icon"
                asChild 
                data-modal-target="extralarge-modal" data-modal-toggle="extralarge-modal"
                className='hover:scale-105 transition-all cursor-pointer hover:bg-primary border-none'
                style={{ borderRadius: '150%', }}
                onClick={() => { alert('add car') }}  
                 >
                <PlusIcon style={{ fontWeight: 'bolder', padding: '0.4rem', color: 'white' }}/>
              </Button> */}
              <SaveCarModal />
              </div>
            )}
          </div>
        </div>
        <Outlet />
      </div>
      <div className="w-full flex justify-center">
        <Footer />
      </div>
    </div>
  );
}
