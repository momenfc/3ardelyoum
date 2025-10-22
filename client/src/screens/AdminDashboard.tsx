import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { Button, Card, IconButton, FAB, Portal, Modal, TextInput } from 'react-native-paper';
import OfferCard from '@/src/components/OfferCard';
import { fetchOffers, addOffer, updateOffer, deleteOffer, OfferDoc } from '@/src/services/offersService';
import { SafeAreaView } from 'react-native-safe-area-context';

const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState<'offers' | 'categories' | 'notifications' | 'settings'>('offers');
  const [offers, setOffers] = useState<OfferDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferDoc | null>(null);
  const [form, setForm] = useState<Partial<OfferDoc>>({});

  const loadOffers = async () => {
    setLoading(true);
    try {
      const data = await fetchOffers();
      setOffers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (section === 'offers') loadOffers();
  }, [section]);

  const handleEdit = (offer: OfferDoc) => {
    setEditingOffer(offer);
    setForm(offer);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert('حذف العرض', 'هل أنت متأكد من حذف هذا العرض؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        style: 'destructive',
        onPress: async () => {
          await deleteOffer(id);
          loadOffers();
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!form.title || !form.discount) return;
    if (editingOffer && editingOffer.id) {
      await updateOffer(editingOffer.id, form);
    } else {
      await addOffer(form as OfferDoc);
    }
    setModalVisible(false);
    setEditingOffer(null);
    setForm({});
    loadOffers();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>لوحة تحكم المشرف</Text>
      <View style={styles.linksRow}>
        <Button mode={section === 'offers' ? 'contained' : 'outlined'} onPress={() => setSection('offers')} style={styles.linkBtn}>
          إدارة العروض
        </Button>
        <Button mode={section === 'categories' ? 'contained' : 'outlined'} onPress={() => setSection('categories')} style={styles.linkBtn}>
          إدارة الأقسام
        </Button>
        <Button mode={section === 'notifications' ? 'contained' : 'outlined'} onPress={() => setSection('notifications')} style={styles.linkBtn}>
          إدارة الإشعارات
        </Button>
        <Button mode={section === 'settings' ? 'contained' : 'outlined'} onPress={() => setSection('settings')} style={styles.linkBtn}>
          إعدادات التطبيق
        </Button>
      </View>
      {section === 'offers' && (
        <>
          <Text style={styles.subtitle}>إدارة العروض</Text>
          <FlatList
            data={offers}
            keyExtractor={item => item.id!}
            refreshing={loading}
            onRefresh={loadOffers}
            renderItem={({ item }) => (
              <Card style={{ marginVertical: 8 }}>
                <Card.Title
                  title={item.title}
                  right={() => (
                    <View style={{ flexDirection: 'row' }}>
                      <IconButton icon="pencil" onPress={() => handleEdit(item)} />
                      <IconButton icon="delete" onPress={() => handleDelete(item.id!)} />
                    </View>
                  )}
                />
                <Card.Content>
                  <Text>نسبة الخصم: {item.discount}%</Text>
                  {item.price_before && <Text>السعر قبل: {item.price_before}</Text>}
                  {item.price_after && <Text>السعر بعد: {item.price_after}</Text>}
                  {item.category && <Text>القسم: {item.category}</Text>}
                  {item.description && <Text>الوصف: {item.description}</Text>}
                </Card.Content>
              </Card>
            )}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>لا توجد عروض</Text>}
          />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => {
              setEditingOffer(null);
              setForm({});
              setModalVisible(true);
            }}
          />
          <Portal>
            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
              <ScrollView>
                <Text style={styles.modalTitle}>{editingOffer ? 'تعديل العرض' : 'إضافة عرض جديد'}</Text>
                <TextInput label="العنوان" value={form.title || ''} onChangeText={v => setForm(f => ({ ...f, title: v }))} style={{ marginBottom: 8 }} />
                <TextInput
                  label="نسبة الخصم"
                  value={form.discount?.toString() || ''}
                  onChangeText={v => setForm(f => ({ ...f, discount: Number(v) }))}
                  keyboardType="numeric"
                  style={{ marginBottom: 8 }}
                />
                <TextInput
                  label="السعر قبل"
                  value={form.price_before?.toString() || ''}
                  onChangeText={v => setForm(f => ({ ...f, price_before: Number(v) }))}
                  keyboardType="numeric"
                  style={{ marginBottom: 8 }}
                />
                <TextInput
                  label="السعر بعد"
                  value={form.price_after?.toString() || ''}
                  onChangeText={v => setForm(f => ({ ...f, price_after: Number(v) }))}
                  keyboardType="numeric"
                  style={{ marginBottom: 8 }}
                />
                <TextInput label="القسم" value={form.category || ''} onChangeText={v => setForm(f => ({ ...f, category: v }))} style={{ marginBottom: 8 }} />
                <TextInput
                  label="الوصف"
                  value={form.description || ''}
                  onChangeText={v => setForm(f => ({ ...f, description: v }))}
                  multiline
                  style={{ marginBottom: 8 }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                  <Button mode="contained" onPress={handleSave}>
                    {editingOffer ? 'حفظ التعديلات' : 'إضافة'}
                  </Button>
                  <Button mode="text" onPress={() => setModalVisible(false)}>
                    إلغاء
                  </Button>
                </View>
              </ScrollView>
            </Modal>
          </Portal>
        </>
      )}
      {section === 'categories' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.subtitle}>إدارة الأقسام (قريباً)</Text>
        </View>
      )}
      {section === 'notifications' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.subtitle}>إدارة الإشعارات (قريباً)</Text>
        </View>
      )}
      {section === 'settings' && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.subtitle}>إعدادات التطبيق (قريباً)</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  linksRow: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  linkBtn: {
    // flex: 1,
    marginHorizontal: 2,
    minWidth: 150,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#1976d2',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 24,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default AdminDashboard;
