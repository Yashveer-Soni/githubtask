import React, { useState, useEffect } from 'react';
import { TextInput, View, FlatList, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import DetailsSheet from '~/components/DetailsSheet';

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingContributors,setLoadingContributors]=useState(false);
  const [error, setError] = useState('');
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [totalContributors,setTotalContributors]=useState(null);

  const searchRepositories = async (query) => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
      setRepos(response.data.items);
    } catch (err) {
      console.log("Error", err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const loadContributors = async (url) => {
    if (!url) return;
    setLoadingContributors(true);
    setError('');
    try {
      const response = await axios.get(`${url}`);
      setTotalContributors(response.data.length);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoadingContributors(false);
    }
  };
  useEffect(() => {
    if (query === '') {
      setRepos([]); 
    } else {
      const delayDebounceFn = setTimeout(() => {
        searchRepositories(query);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [query]);

  const openDetailsSheet = (repo) => {
    setSelectedRepo(null); 
    loadContributors(repo.contributors_url);
    setTimeout(() => {
      setSelectedRepo(repo);  
      setIsSheetVisible(true); 
    }, 100); 
  };

  const closeDetailsSheet = () => {
    setIsSheetVisible(false);
    setSelectedRepo(null); 
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Repositories"
          value={query}
          onChangeText={setQuery} 
        />

        {loading && <ActivityIndicator color={'black'} size={20} />}
        {error && <Text style={{ textAlign: "center" }}>{error}</Text>}
        {repos.length === 0 && !loading &&!error && <Text style={{ textAlign: "center" }}>No repositories found</Text>}
        
        <FlatList
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.repoItem}
              onPress={() => openDetailsSheet(item)}  
            >
              <Image source={{ uri: item.owner.avatar_url }} style={styles.ownerAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.repoName}>{item.name?.split('').slice(0, 40).join('')}{item.name?.split('').length > 40 ? '...' : ''}</Text>
                <Text style={styles.repoDescription}>
                  {item.description?.split('').slice(0, 50).join('')}{item.description?.split('').length > 50 ? '...' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {selectedRepo && isSheetVisible && (
        <DetailsSheet 
          key={selectedRepo.id}  
          repo={selectedRepo}  
          closeDetailsSheet={closeDetailsSheet} 
          totalContributors={totalContributors}
          loadingContributors={loadingContributors}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom:80
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  ownerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginTop: 12,
  },
  repoItem: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#F4F6FF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  repoDescription: {
    color: '#555',
    fontSize: 12,
  },
});

export default HomeScreen;
