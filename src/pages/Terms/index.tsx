// src/pages/TermsPage.tsx
import { useTranslation } from "react-i18next";
import HeaderComponent from "../../components/HeaderComponent";

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderComponent />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 mt-10 mb-12">
        <div className="card bg-base-100 rounded-lg p-6">
          {/* Title */}
          <h1 className="mb-6 text-center text-xl font-extrabold sm:text-2xl md:text-3xl">
            {t("terms.title")}
          </h1>

          {/* Intro */}
          <p className="text-sm sm:text-base mb-4 leading-relaxed">
            {t("terms.intro")}
          </p>

          {/* Section 1 */}
          <h2 className="text-base sm:text-lg font-bold mb-2">
            {t("terms.section1.title")}
          </h2>
          <ul className="list-disc list-inside mb-4 space-y-2 text-sm sm:text-base">
            {(t("terms.section1.items", { returnObjects: true }) as string[]).map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          {/* Section 2 */}
          <h2 className="text-base sm:text-lg font-bold mb-2">
            {t("terms.section2.title")}
          </h2>
          <p className="text-sm sm:text-base mb-4 leading-relaxed">
            {t("terms.section2.text")}
          </p>

          {/* Section 3 */}
          <h2 className="text-base sm:text-lg font-bold mb-2">
            {t("terms.section3.title")}
          </h2>
          <p className="text-sm sm:text-base mb-4 leading-relaxed">
            {t("terms.section3.text")}
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
