package com.example.demo.Seguridad.Configuracion;

import com.example.demo.DTOs.AuthDTO.AutenticacionRespuesta;
import com.example.demo.Entidades.Usuario;
import com.example.demo.Enums.UsuarioEnum;
import com.example.demo.Repositorios.UsuarioRepositorio;
import com.example.demo.Seguridad.Servicios.CookieServicio;
import com.example.demo.Seguridad.Servicios.JWTServicio;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final CookieServicio cookieServicio;
    private final JWTServicio jwtServicio;
    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");

        if (email == null || email.isBlank()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "No se pudo obtener el email desde OAuth2.");
            return;
        }

        String nombre = oAuth2User.getAttribute("given_name");
        String apellido = oAuth2User.getAttribute("family_name");
        String alias = email.split("@")[0];

        Optional<Usuario> usuarioOptional = usuarioRepositorio.findByEmailUsuario(email);
        AutenticacionRespuesta respuesta;
        String token;

        // Si existe, se loguea
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            login(usuario, response);
            respuesta = new AutenticacionRespuesta(true, "Login exitoso con Google", usuario);

        } else {
            Usuario nuevoUsuario = registro(nombre, apellido, alias, email, response);
            respuesta = new AutenticacionRespuesta(true, "Registro exitoso con Google", nuevoUsuario);
        }

        // En lugar de redirect, devolver JSON con la información del usuario
        construccionRespuesta(response, respuesta);
    }

    public void login (Usuario usuario, HttpServletResponse response) {
        String token = jwtServicio.generarToken(usuario);
        cookieServicio.deleteCookie("token", response);
        cookieServicio.addHttpOnlyCookie("token", token, 7*24*60*60, response);
    }

    public Usuario registro (String nombre, String apellido, String alias, String email, HttpServletResponse response) {
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreUsuario(nombre != null ? nombre : "Usuario");
        nuevoUsuario.setApellidoUsuario(apellido != null ? apellido : "OAuth");
        nuevoUsuario.setNumeroDocumentoUsuario("222222222222");
        nuevoUsuario.setAlias(alias);
        nuevoUsuario.setEmailUsuario(email);
        nuevoUsuario.setHashContrasenaUsuario(passwordEncoder.encode("N/A"));
        nuevoUsuario.setTelefonoUsuario("N/A");
        nuevoUsuario.setRolUsuario(UsuarioEnum.VENDEDOR);

        Usuario usuarioGuardado = usuarioRepositorio.save(nuevoUsuario);

        String token = jwtServicio.generarToken(usuarioGuardado);
        cookieServicio.deleteCookie("token", response);
        cookieServicio.addHttpOnlyCookie("token", token, 7*24*60*60, response);
        
        return usuarioGuardado;
    }

    public void construccionRespuesta (HttpServletResponse response, AutenticacionRespuesta respuesta) throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(mapper.writeValueAsString(respuesta));
    }

} 