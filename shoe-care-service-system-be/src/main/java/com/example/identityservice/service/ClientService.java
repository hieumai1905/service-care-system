package com.example.identityservice.service;

import com.example.identityservice.dto.request.CreateClientRequest;
import com.example.identityservice.dto.request.SearchClientRequest;
import com.example.identityservice.dto.request.UpdateClientRequest;
import com.example.identityservice.dto.response.ReportClientResponse;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Client;
import com.example.identityservice.entity.ClientCategory;
import com.example.identityservice.entity.Order;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ClientCategoryRepository;
import com.example.identityservice.repository.ClientRepository;
import com.example.identityservice.repository.OrderRepository;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ClientService {
    private ClientRepository clientRepository;
    private ClientCategoryRepository clientCategoryRepository;
    OrderRepository orderRepository;

    public UpdateClientRequest createClient(CreateClientRequest request) {
//        request.validateInput();
        ClientCategory clientCategory = getExistClientCategory(request.getClientCategoryId());
        Client client = ConvertUtils.convert(request, Client.class);
        client.setClientCategory(clientCategory);
        client.setId(null);
        clientRepository.save(client);
        return ConvertUtils.convert(client, UpdateClientRequest.class);
    }

    public Long updateClient(UpdateClientRequest request) {
//        request.validateInput();
        Client existingClient = getExistClient(request.getId());
        ClientCategory clientCategory = getExistClientCategory(request.getClientCategoryId());

        existingClient.setClientCategory(clientCategory);
        existingClient.setName(request.getName());
        existingClient.setEmail(request.getEmail());
        existingClient.setAddress(request.getAddress());
        existingClient.setTel(request.getTel());
        existingClient.setBirthday(request.getBirthday());
        existingClient.setNote(request.getNote());

        clientRepository.save(existingClient);
        return existingClient.getId();
    }

    public void deleteClient(Long id) {
        Client existingClient = getExistClient(id);
        try {
            clientRepository.delete(existingClient);
        } catch (Exception ex) {
            throw new AppException(ErrorCode.CLIENT_IN_USE);
        }
    }

    public SearchResponse<UpdateClientRequest> searchClient(SearchClientRequest request) {
        request.validateInput();

        Page<Client> clients = clientRepository.search(
                request.getKeyWord(),
                request.getClientCategoryId(),
                PaginationUtils.getPageable(request.getPageIndex(), request.getPageSize())
        );

        SearchResponse<UpdateClientRequest> response = new SearchResponse<>();
        response.setPageIndex(request.getPageIndex());
        response.setPageSize(request.getPageSize());
        response.setTotalElements(clients.getTotalElements());
        response.setData(ConvertUtils.convertList(clients.getContent(), UpdateClientRequest.class));

        return response;
    }

    private Client getExistClient(Long id) {
        return clientRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.CLIENT_NOT_FOUND)
        );
    }

    private ClientCategory getExistClientCategory(Long clientCategoryId) {
        return clientCategoryRepository.findById(clientCategoryId).orElseThrow(
                () -> new AppException(ErrorCode.CLIENT_CATEGORY_NOT_FOUND)
        );
    }

    public List<UpdateClientRequest> findAll() {
        return ConvertUtils.convertList(clientRepository.findAll(), UpdateClientRequest.class);
    }

    public List<UpdateClientRequest> searchClients(String keyword) {
        Long id = ConvertUtils.parseIdFromKeyword(keyword);
        List<Client> clients = clientRepository.searchClientsByKeyword(keyword, id);
        return ConvertUtils.convertList(clients, UpdateClientRequest.class);
    }

    public UpdateClientRequest findById(Long id) {
        return ConvertUtils.convert(getExistClient(id), UpdateClientRequest.class);
    }

    public ReportClientResponse getReport(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        List<Order> orders = orderRepository.findOrdersByClientId(clientId);

            Double totalPaid = 0.0;
        Long countOrder = (long) orders.size();
        Double minPaid = Double.MAX_VALUE;
        Double maxPaid = Double.MIN_VALUE;

        for (Order order : orders) {
            Double orderTotal = order.getTotal();
            totalPaid += orderTotal;

            if (orderTotal < minPaid) {
                minPaid = orderTotal;
            }
            if (orderTotal > maxPaid) {
                maxPaid = orderTotal;
            }
        }

        if (minPaid == Double.MAX_VALUE) {
            minPaid = 0.0;
        }

        return ReportClientResponse.builder()
                .totalPaid(totalPaid)
                .countOrder(countOrder)
                .minPaid(minPaid)
                .maxPaid(maxPaid)
                .build();
    }
}
