import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Invoices } from './pages/Invoices';
import { Sales } from './pages/Sales';
import { CreateInvoice } from './pages/CreateInvoice';
import { AllSales } from './pages/AllSales';
import { SaleDetail } from './pages/SaleDetail';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigate to="/faturas" replace />} />
        <Route path="/faturas" element={<Invoices />} />
        <Route path="/faturas/:invoiceId/vendas" element={<Sales />} />
        <Route path="/faturas/criar-fatura" element={<CreateInvoice />} />
        <Route path="/vendas" element={<AllSales />} />
        <Route path="/vendas/:saleId" element={<SaleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
