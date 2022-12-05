import ContentRowTop from "./ContentRowTop";

import Footer from "./Footer";
import TableProducts from "./tableProducts/TableProducts";
import TopBar from "./TopBar";

function ContentWrapper() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      {/* <!-- Main Content --> */}
      <div id="content">
        <TopBar />
        <ContentRowTop />
        <TableProducts />
      </div>
      {/* <!-- End of MainContent --> */}

      <Footer />
    </div>
  );
}

export default ContentWrapper;
