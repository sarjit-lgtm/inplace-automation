import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 10 },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontFamily: "Helvetica-Bold", marginBottom: 5 },
  subtitle: { fontSize: 12, color: "#666", marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontFamily: "Helvetica-Bold", marginBottom: 10, marginTop: 20 },
  clientInfo: { marginBottom: 20 },
  clientRow: { flexDirection: "row", marginBottom: 3 },
  clientLabel: { width: 80, fontFamily: "Helvetica-Bold" },
  clientValue: { flex: 1 },
  table: { marginTop: 10 },
  tableHeader: { flexDirection: "row", backgroundColor: "#1a1a1a", color: "#fff", padding: 8 },
  tableRow: { flexDirection: "row", padding: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  colDescription: { flex: 3 },
  colDetails: { flex: 2 },
  colQty: { width: 40, textAlign: "center" },
  colPrice: { width: 80, textAlign: "right" },
  totalSection: { marginTop: 20, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", marginBottom: 5 },
  totalLabel: { width: 150, textAlign: "right", paddingRight: 10 },
  totalValue: { width: 80, textAlign: "right" },
  grandTotal: { fontFamily: "Helvetica-Bold", fontSize: 14, marginTop: 5 },
  footer: { position: "absolute", bottom: 40, left: 50, right: 50 },
  footerText: { fontSize: 8, color: "#999", textAlign: "center" },
  terms: { marginTop: 30, fontSize: 8, color: "#666", lineHeight: 1.5 },
});

type Line = {
  description: string;
  dimensions: string | null;
  doorStyle: string | null;
  finish: string | null;
  hardware: string | null;
  quantity: number;
  lineTotal: number;
};

type ProposalData = {
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  projectAddress: string;
  supplierName: string;
  lines: Line[];
  installationCost: number;
  timelineEstimate: string | null;
  termsAndConditions: string | null;
  total: number;
  createdAt: string;
};

export function ProposalDocument({ data }: { data: ProposalData }) {
  const cabinetsSubtotal = data.lines.reduce((s, l) => s + l.lineTotal, 0);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INPLACE STUDIO</Text>
          <Text style={styles.subtitle}>Kitchen Design Proposal</Text>
        </View>

        <View style={styles.clientInfo}>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Prepared for:</Text>
            <Text style={styles.clientValue}>{data.clientName}</Text>
          </View>
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Address:</Text>
            <Text style={styles.clientValue}>{data.projectAddress}</Text>
          </View>
          {data.clientEmail && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Email:</Text>
              <Text style={styles.clientValue}>{data.clientEmail}</Text>
            </View>
          )}
          {data.clientPhone && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Phone:</Text>
              <Text style={styles.clientValue}>{data.clientPhone}</Text>
            </View>
          )}
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Date:</Text>
            <Text style={styles.clientValue}>
              {new Date(data.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </Text>
          </View>
          {data.timelineEstimate && (
            <View style={styles.clientRow}>
              <Text style={styles.clientLabel}>Timeline:</Text>
              <Text style={styles.clientValue}>{data.timelineEstimate}</Text>
            </View>
          )}
          <View style={styles.clientRow}>
            <Text style={styles.clientLabel}>Cabinetry:</Text>
            <Text style={styles.clientValue}>{data.supplierName}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Cabinetry & Specifications</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDescription}>Description</Text>
            <Text style={styles.colDetails}>Details</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Price</Text>
          </View>
          {data.lines.map((line, i) => {
            const details = [line.dimensions, line.doorStyle, line.finish, line.hardware]
              .filter(Boolean)
              .join(" | ");
            return (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colDescription}>{line.description}</Text>
                <Text style={styles.colDetails}>{details}</Text>
                <Text style={styles.colQty}>{line.quantity}</Text>
                <Text style={styles.colPrice}>${line.lineTotal.toLocaleString()}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Cabinetry Subtotal:</Text>
            <Text style={styles.totalValue}>${cabinetsSubtotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Installation:</Text>
            <Text style={styles.totalValue}>${data.installationCost.toLocaleString()}</Text>
          </View>
          <View style={[styles.totalRow, { borderTopWidth: 2, borderTopColor: "#000", paddingTop: 5 }]}>
            <Text style={[styles.totalLabel, styles.grandTotal]}>Total Investment:</Text>
            <Text style={[styles.totalValue, styles.grandTotal]}>${data.total.toLocaleString()}</Text>
          </View>
        </View>

        {data.termsAndConditions && (
          <View>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            <Text style={styles.terms}>{data.termsAndConditions}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Inplace Studio | inplacestudio.com | This proposal is valid for 30 days from the date above.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
