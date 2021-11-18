import React from 'react';
import Header from '../components/pages/Promotions/Header/Header';
import Breadcrumb from '../components/fragments/Breadcrumb';
import Footer from '../components/pages/Promotions/Footer/FooterC';
import { Route } from 'react-router-dom';
import { WebSettingsProvider } from '../redux/Providers/WebsettingsProvider';

function CommonRoute({
  Component,
  renderDefaultComponent = true,
  ...rest
}: any) {
  return (
    <WebSettingsProvider>
      <div className='main-wrapper'>
        {/* Header */}
        {renderDefaultComponent && <Header />}
        {/* Content Area */}
        <Route component={Component} {...rest} />
        {/* Footer */}
        {renderDefaultComponent && <Footer />}
      </div>
    </WebSettingsProvider>
  );
}

export default CommonRoute;
