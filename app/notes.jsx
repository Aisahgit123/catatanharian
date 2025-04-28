import React, { useState } from 'react';
import {View,Text,FlatList,StyleSheet,Pressable,Alert,TextInput,Modal,Button,} from 'react-native';

export default function HomeScreen() {
  const [notes, setNotes] = useState([
    {
      date: '17 April 2025',
      title: 'Hari di Pantai',
      content: 'Liburan yang begitu menyenangkan.',
    },
    {
      date: '16 April 2025',
      title: 'Belajar Pemrograman',
      content: 'Belajar pemrograman reacnative.',
    },
    {
      date: '18 April 2025',
      title: 'Menonton Film',
      content: 'Menonton film yang berjudul cinta dalam ikhlas',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleDelete = (index) => {
    Alert.alert('Hapus Catatan', 'Yakin ingin menghapus catatan ini?', [
      { text: 'Batal' },
      {
        text: 'Hapus',
        onPress: () => {
          const updatedNotes = [...notes];
          updatedNotes.splice(index, 1);
          setNotes(updatedNotes);
        },
        style: 'destructive',
      },
    ]);
  };

  const handleSaveNote = () => {
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const newNote = {
      date: currentDate,
      title: newTitle,
      content: newContent,
    };

    let updatedNotes = [...notes];
    if (editIndex !== null) {
      updatedNotes[editIndex] = newNote;
    } else {
      updatedNotes.unshift(newNote);
    }

    setNotes(updatedNotes);
    setModalVisible(false);
    setNewTitle('');
    setNewContent('');
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const note = notes[index];
    setNewTitle(note.title);
    setNewContent(note.content);
    setEditIndex(index);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catatan Harian</Text>

      <FlatList
        data={notes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <View style={styles.actions}>
              <Pressable onPress={() => handleEdit(index)}>
                <Text style={styles.edit}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(index)}>
                <Text style={styles.delete}>Hapus</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Tambah Catatan</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit Catatan' : 'Tambah Catatan'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Judul"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Isi Catatan"
              value={newContent}
              onChangeText={setNewContent}
              multiline
            />
            <View style={styles.modalButtons}>
              <Button title="Batal" onPress={() => setModalVisible(false)} />
              <Button title="Simpan" onPress={handleSaveNote} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#BBA4E1',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noteContainer: {
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 12,
  },
  date: {
    color: '#4B00FF',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    color: '#555',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  edit: {
    color: '#007BFF',
  },
  delete: {
    color: '#FF3B30',
  },
  addButton: {
    backgroundColor: '#4B00FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
